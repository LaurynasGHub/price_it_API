/**
 * Function calculates the cost of main food items cart at specified shop.
 * @param {string} shop - name of the shop.
 * @returns {JSON} - prices of the carts in each shop.
 */

const {
  getBarboraScraperResults,
  getRimiScraperResults,
  getLastMileScraperResults,
} = require('../controllers/index');

// array that contains main food items to search.
const mainFoodItems = ['pienas', 'duona', 'suris', 'sviestas', 'desra'];

async function mainItemsCartPrice() {
  console.log(' > Main items cart price');

  const returnJson = {};

  // get product prices from each shop and add them to returnJson
  // rimi results
  const rimiData = await calculateCartPrice('rimi', getRimiScraperResults);
  returnJson['rimi'] = rimiData['rimi'];
  // barbora results
  const barboraData = await calculateCartPrice(
    'barbora',
    getBarboraScraperResults
  );
  returnJson['barbora'] = barboraData['barbora'];
  // last mile results
  const lastMileData = await calculateCartPrice(
    'lastMile',
    getLastMileScraperResults
  );
  returnJson['lastMile'] = lastMileData['lastMile'];

  return returnJson;
}

async function calculateCartPrice(shop, scraper) {
  let returnJson = { [shop]: [] };

  const promises = mainFoodItems.map(async (element) => {
    try {
      // get top 5 results
      const shopData = await scraper(element);

      // sort response
      const sortedShopData = shopData.products.sort(
        (a, b) => a.price - b.price
      );

      // take the cheapest result
      const cheapestShopResult = sortedShopData[0];

      returnJson[shop].push({ [element]: cheapestShopResult });
    } catch (error) {
      console.error('Error:', error);
      return;
    }
  });
  await Promise.all(promises);

  return returnJson;
}

module.exports = mainItemsCartPrice;
