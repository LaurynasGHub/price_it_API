/**
 * Function calculates the cost of main food items cart at specified shop.
 * @returns {JSON} - prices of the cart items in each shop.
 */

const {
  getBarboraScraperResults,
  getRimiScraperResults,
  getLastMileScraperResults,
  getProfileOptions,
} = require('./index');

async function mainItemsPrices(id) {
  const returnArr = [];

  let mainFoodItems;

  // if userId is not provided (no user is logged in)
  // default to default items
  if (id === '') {
    mainFoodItems = ['pienas', 'duona', 'suris', 'sviestas', 'desra'];
  } else {
    mainFoodItemsObj = await getProfileOptions(id);
    // if profile options are not present(user just registered)
    // default to default items
    if (mainFoodItemsObj === null) {
      mainFoodItems = ['pienas', 'duona', 'suris', 'sviestas', 'desra'];
    } else {
      mainFoodItems = mainFoodItemsObj.mainProducts;
    }
  }

  // if options exist, but there are less than 1 default to default
  if (mainFoodItems.length < 1) {
    mainFoodItems = ['pienas', 'duona', 'suris', 'sviestas', 'desra'];
  }

  // get product prices from each shop and add them to returnJson
  // rimi results
  const rimiData = await calculateCartPrice(
    'rimi',
    getRimiScraperResults,
    mainFoodItems
  );

  returnArr.push(rimiData);

  const barboraData = await calculateCartPrice(
    'barbora',
    getBarboraScraperResults,
    mainFoodItems
  );

  returnArr.push(barboraData);

  const lastMileData = await calculateCartPrice(
    'lastMile',
    getLastMileScraperResults,
    mainFoodItems
  );

  returnArr.push(lastMileData);

  return returnArr;
}

async function calculateCartPrice(shop, scraper, mainFoodItems) {
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
      console.error('cartPrices.js Error:', error);
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
