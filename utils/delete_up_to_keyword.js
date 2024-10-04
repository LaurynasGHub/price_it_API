/**
 * Function returns the text after the keyword.
 * @param {string} text - text from which to delete unnecessary text.
 * @param {string} keyword - deletes text up to the keyword.
 * @returns {string}
 */

function deleteUpToKeyword(text, keyword) {
  const keywordIndex = text.indexOf(keyword);

  // If the keyword is found, remove all content up to that point
  if (keywordIndex !== -1) {
    const updatedContent = text.substring(keywordIndex);
    return updatedContent;
  } else {
    console.log(`Keyword "${keyword}" not found.`);
    return text; // Return the original content if the keyword is not found
  }
}

module.exports = deleteUpToKeyword;
