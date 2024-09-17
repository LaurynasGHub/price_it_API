/**
 * Function gets results from Barbora e-shop.
 * @param {string} searchTerms string of what to search, more that one word should be grouped using "+".
 * @returns {JSON}
 */

async function barboraScraper(searchTerms) {
  console.log(' > Barbora scraper');

  //shop URL
  let fetchUrl =
    'https://www.barbora.lt/api/eshop/v1/analyticsearch/query?&limit=5&query=';

  //combine everything to one string
  let fullFetchUrl = `${fetchUrl}${searchTerms}`;
  console.log(` >> fullFetchUrl- ${fullFetchUrl}`);

  try {
    console.log(' >> Fetching data...');

    const response = await fetch(fullFetchUrl);

    console.log(' >> Fetch completed!');

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
// export { barboraScraper };
// barboraScraper(['pienas']);
