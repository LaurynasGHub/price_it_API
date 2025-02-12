/**
 * Function calculates the cost of main food items at specified shop.
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
  const returnJson = {};

  // get product prices from each shop and add them to returnJson

  const rimiData = await itemPrices('rimi', getRimiScraperResults);

  returnJson['rimi'] = rimiData['rimi'];

  const barboraData = await itemPrices('barbora', getBarboraScraperResults);

  returnJson['barbora'] = barboraData['barbora'];

  const lastMileData = await itemPrices('lastMile', getLastMileScraperResults);

  returnJson['lastMile'] = lastMileData['lastMile'];

  return returnJson;
}

async function itemPrices(shop, scraper) {
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

      returnJson[shop].push({
        product: {
          main_food_item: element,
          name: cheapestShopResult.name,
          price: cheapestShopResult.price,
        },
      });
    } catch (error) {
      console.error('main ItemsPrices.js Error:', error);
      return;
    }
  });
  await Promise.all(promises);

  return returnJson;
}

module.exports = mainItemsPrices;
