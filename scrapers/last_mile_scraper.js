/**
 * Function gets search results from Iki e-shop (Last Mile).
 *
 * In product.prc there are several options:
 * p - default price, l - price with iki card
 *
 * @param {string} searchTerms string of what to search.
 * @returns {JSON}
 */

async function lastMileScraper(searchTerms) {
  console.log(' > Last Mile scraper');

  //   shop URL
  const fetchUrl = 'https://search-dvbpbqktxq-lz.a.run.app/view_products';

  try {
    console.log(' >> Fetching data...');

    const response = await fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        limit: 5,
        query: {
          text: `${searchTerms}`,
          languageCode: 'en',
        },
        params: {
          type: 'view_products',
          isActive: true,
          isApproved: true,
          chainIds: ['CvKfTzV4TN5U8BTMF1Hl'],
          storeIds: [],
          isUsingStockByChainId: {
            CvKfTzV4TN5U8BTMF1Hl: true,
          },
        },
        fromIndex: 0,
        slim: true,
      }),
    });

    console.log(' >> Fetch completed!');

    const result = await response.json();

    let returnJson = { products: [] };

    for (let product of result.data) {
      let pushProduct = {
        name: product.name.lt,
        price: product.prc.p,
        priceWithDiscount: product.prc.l,
      };

      returnJson.products.push(pushProduct);
    }

    return returnJson;
  } catch (error) {
    console.error(' >> Error:', error);
  }
}

module.exports = lastMileScraper;
// lastMileScraper('');
