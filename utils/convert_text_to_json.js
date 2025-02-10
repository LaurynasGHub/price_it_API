//
// Function converts given text to required JSON format.
// Each element should have title and price.
// Function also converts unicode to lithuanian characters
//
/**
 * Converts given text to JSON file format with the structure of 'name/title' and 'price'. Mainly works for Rimi scraper.
 * @param {string} sliceWord - string from which the remaining line is taken.
 * @param {string} text - text which to convert to JSON.
 * @param {string} name - how name is called in JSON object.
 * @param {string} priceName - how price is called in JSON object.
 * @returns {JSON}
 */

function convertTextToJson(text, sliceWord, name, priceName) {
  const unicodeCharSwitch = require('./unicode_char_switch.js');
  const removeChars = require('./remove_chars_from_string.js');

  const usableText = unicodeCharSwitch(text);

  // get each line of the given text
  const lines = usableText.split('\n');

  let returnJson = { products: [] };

  let productName = null;
  let productPrice = null;
  // define the return productName
  let fullProductName = '';

  let counter = 0;

  for (let line = 0; line < lines.length; line++) {
    // check counter, if equals 5 - terminate
    if (counter === 5) {
      return returnJson;
    }

    // check if required line with name/title also contains the needed brand
    if (lines[line].includes(name)) {
      productName = lines[line]
        .slice(lines[line].indexOf(sliceWord) + sliceWord.length)
        .trim();

      priceCheck = true;
    }

    if (lines[line].includes(priceName) && priceCheck) {
      productPrice = parseFloat(
        lines[line].slice(lines[line].indexOf(sliceWord) + sliceWord.length)
      );
    }

    if (productName && productPrice) {
      // gets full product name and removes ""
      fullProductName = removeChars(productName, ['"']);

      let product = {
        // removes the last character in a string, usually ","
        // name: fullProductName,
        name: fullProductName.slice(0, fullProductName.length - 1),
        price: productPrice,
      };

      returnJson.products.push(product);
      // increment the counter
      counter++;

      productName = null;
      productPrice = null;
    }
  }

  return returnJson;
}

module.exports = convertTextToJson;
