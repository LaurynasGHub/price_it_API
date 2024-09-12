/**
 * Removes the given characters from string.
 * @param {string} text - text from which to remove characters.
 * @param {array} charsToRemove - array of characters to remove.
 * @returns {string}
 */

function removeChars(text, charsToRemove) {
  if (charsToRemove.length < 1) {
    console.log(' > removeChars \n >> charsToRemove array is empty');
    return;
  }

  let removeText = text;

  console.log(removeText);

  charsToRemove.forEach((element) => {
    let re = new RegExp(element, 'g');

    removeText = removeText.replace(re, '');
  });

  console.log(removeText);

  return removeText;
}

module.exports = removeChars;
// removeChars('Labas labas bababasaslabas', ['a', 'l']);
