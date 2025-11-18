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

  const fullFetchUrl = `${fetchUrl}${searchTerms}`;

  try {
    const response = await fetch(fullFetchUrl);

    if (!response.ok) {
      console.error(` > Rimi HTTP error! Status: ${response.status}`);
      // return empty JSON on error, don't throw to prevent breaking other scrapers
      return { products: [] };
    }

    const result = await response.text();

    const manResult = deleteUpToKeyword(result, 'currencyCode');

    const rimiJson = convertTextToJson(manResult, '": ', 'name', 'price');

    return rimiJson;
  } catch (error) {
    console.error('Error:', error);
    return;
  }
}

module.exports = rimiScraper;
