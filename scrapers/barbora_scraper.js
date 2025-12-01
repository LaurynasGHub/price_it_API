/**
 * Function gets results from Barbora e-shop.
 * @param {string} searchTerms string of what to search.
 * @returns {JSON}
 */
async function barboraScraper(searchTerms) {
  const fetchUrl =
    'https://barbora.lt/api/eshop/v1/analyticsearch/query?&limit=5&query=';

  const fullFetchUrl = `${fetchUrl}${searchTerms}`;

  try {
    const response = await fetch(fullFetchUrl, {
      headers: {
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'lt-LT,lt;q=0.9,en-US;q=0.8,en;q=0.7',
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Safari/537.36',
      },
    });

    if (!response.ok) {
      console.error(` > Barbora HTTP error! Status: ${response.status}`);

      return { products: [] };
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

// barboraScraper('pienas');
module.exports = barboraScraper;
// export default barboraScraper;
