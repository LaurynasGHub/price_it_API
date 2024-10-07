/**
 * Function calculates the cost of main food items cart at specified shop.
 * @returns {JSON} - prices of the cart items in each shop.
 */

const {
  getBarboraScraperResults,
  getRimiScraperResults,
  getLastMileScraperResults,
} = require('./index');

// array that contains main food items to search.
const mainFoodItems = ['pienas', 'duona', 'suris', 'sviestas', 'desra'];

async function mainItemsPrices() {
  const returnArr = [];

  // get product prices from each shop and add them to returnJson
  // rimi results
  const rimiData = await calculateCartPrice('rimi', getRimiScraperResults);

  returnArr.push(rimiData);

  const barboraData = await calculateCartPrice(
    'barbora',
    getBarboraScraperResults
  );

  returnArr.push(barboraData);

  const lastMileData = await calculateCartPrice(
    'lastMile',
    getLastMileScraperResults
  );

  returnArr.push(lastMileData);

  return returnArr;
}

async function calculateCartPrice(shop, scraper) {
  let cartPrice = 0;

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

      cartPrice += cheapestShopResult.price;
    } catch (error) {
      console.error('Error:', error);
      return;
    }
  });
  // wait till all promises finishes
  await Promise.all(promises);

  let returnJson = {
    shop: shop,
    price: (Math.round(cartPrice * 100) / 100).toFixed(2),
  };
  return returnJson;
}

module.exports = mainItemsPrices;
