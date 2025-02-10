/**
 * Function gets results from Vynoteka e-shop.
 * @param {string} searchTerms string of what to search.
 * @returns {JSON}
 */

const convertTextToJson = require('../utils/convert_text_to_json');

async function vynotekaScraper(searchTerms) {
  const fs = require('fs');
  const deleteUpToKeyword = require('../utils/delete_up_to_keyword');
  //shop URL
  const fetchUrl = 'https://vynoteka.lt/lt/api/product/search?query=';

  //combine everything to one string
  const fullFetchUrl = `${fetchUrl}${searchTerms}`;

  try {
    const response = await fetch(fullFetchUrl);

    if (!response.ok) {
      throw new Error(` > HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    const resultTxt = JSON.stringify(result, null, 2); // Format JSON nicely

    const manText = deleteUpToKeyword(resultTxt, '"list"');

    const returnJSON = convertTextToJson(manText, '": ', '"label"', ' "pr"');

    // fs.writeFileSync(
    //   'vynoteka_scraper.txt',
    //   JSON.stringify(returnJSON, null, 2),
    //   'utf8'
    // );

    return returnJSON;
  } catch (error) {
    console.error('Error:', error);
    return;
  }
}

// vynotekaScraper('Degtine');

module.exports = vynotekaScraper;
