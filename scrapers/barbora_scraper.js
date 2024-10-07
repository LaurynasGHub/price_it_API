/**
 * Function gets results from Barbora e-shop.
 * @param {string} searchTerms string of what to search.
 * @returns {JSON}
 */

async function barboraScraper(searchTerms) {
  //shop URL
  const fetchUrl =
    'https://www.barbora.lt/api/eshop/v1/analyticsearch/query?&limit=5&query=';

  //combine everything to one string
  const fullFetchUrl = `${fetchUrl}${searchTerms}`;

  try {
    const response = await fetch(fullFetchUrl);

    if (!response.ok) {
      throw new Error(` > HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    let returnJson = { products: [] };

    for (let product of result.products) {
      let pushProduct = {
        name: product.title,
        price: product.price,
      };

      returnJson.products.push(pushProduct);
    }

    return returnJson;
  } catch (error) {
    console.error('Error:', error);
    return;
  }
}

module.exports = barboraScraper;
