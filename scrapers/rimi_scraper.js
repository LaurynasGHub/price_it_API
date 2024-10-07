//
// Rimi scraper bot
// Function searches in a rimi e-shop and returns html file.
// Html is then manipulated to get the json object.
//

/**
 *
 * @param {string} searchTerms string of what to search, more that one word should be grouped using "+".
 * @returns {JSON}
 */

async function rimiScraper(searchTerms) {
  const deleteUpToKeyword = require('../utils/delete_up_to_keyword');
  const convertTextToJson = require('../utils/convert_text_to_json');

  const fetchUrl = 'https://www.rimi.lt/e-parduotuve/lt/paieska?query=';

  // Combine search terms and URL in to one string
  const fullFetchUrl = `${fetchUrl}${searchTerms}`;

  try {
    // get the response from rimi e-shop
    const response = await fetch(fullFetchUrl);

    if (!response.ok) {
      throw new Error(` > HTTP error! Status: ${response.status}`);
    }

    // Take the result as text
    const result = await response.text();

    // Perform the operation to get only the needed part
    const manResult = deleteUpToKeyword(result, 'currencyCode');

    // convert the manResulted to JSON file that has the needed structure
    const rimiJson = convertTextToJson(manResult, '": ', 'name');

    return rimiJson;
  } catch (error) {
    console.error('Error:', error);
    return;
  }
}

module.exports = rimiScraper;
