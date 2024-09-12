//
// Function converts given text to required JSON format.
// Each element should have title and price.
// Function also converts unicode to lithuanian characters
//
/**
 * Converts given text to JSON file format with the structure of 'name' and 'price'. Mainly works for Rimi scraper.
 * @param {string} sliceWord - represents from which part take the remaining JSON line.
 * @param {string} text - text which to convert to JSON.
 * @param {string} name - 'name' or 'title' - which one is in return JSON.
 * @returns {JSON}
 */

const removeChars = require('./remove_chars_from_string.js');

function convertTextToJson(text, sliceWord, name) {
  const unicodeCharSwitch = require('./unicode_char_switch.js');
  const removeChars = require('./remove_chars_from_string.js');

  const usableText = unicodeCharSwitch(text);

  // get each line of the given text
  const lines = usableText.split('\n');

  let returnJson = { products: [] };

  let productName = null;
  let productPrice = null;

  for (let line = 0; line < lines.length; line++) {
    if (lines[line].includes(name)) {
      productName = lines[line]
        .slice(lines[line].indexOf(sliceWord) + sliceWord.length)
        .trim();
    }

    if (lines[line].includes('"price"')) {
      productPrice = parseFloat(
        lines[line].slice(lines[line].indexOf(sliceWord) + sliceWord.length)
      );
    }

    if (productName && productPrice) {
      let product = {
        name: removeChars(productName, ['"', ',']),
        price: productPrice,
      };

      returnJson.products.push(product);

      productName = null;
      productPrice = null;
    }
  }

  return returnJson;
}

module.exports = convertTextToJson;
