/**
 * Function gets results from Vynoteka e-shop.
 * @param {string} searchTerms string of what to search.
 * @returns {JSON}
 */

async function vynotekaScraper(searchTerms) {
  //shop URL
  const fetchUrl = 'https://vynoteka.lt/lt/api/product/search?query=';

  const fullFetchUrl = `${fetchUrl}${searchTerms}`;

  try {
    const response = await fetch(fullFetchUrl);

    if (!response.ok) {
      throw new Error(` > HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    let returnJSON = { products: [] };

    for (let i = 0; i < 5; i++) {
      let pushProduct = {
        name: result.list[i].label,
        price: result.list[i].p.pr,
      };

      returnJSON.products.push(pushProduct);
    }

    return returnJSON;
  } catch (error) {
    console.error('Error:', error);
    return;
  }
}

// vynotekaScraper('Degtine');

module.exports = vynotekaScraper;
