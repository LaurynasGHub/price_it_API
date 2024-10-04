//
// Function gets top search results from server.
//
const searchModel = require('../models/searchModel.js');

async function getTopSearches() {
  console.log(' > Get top searches');

  const response = await searchModel.find();

  const sortedResponse = response.sort(
    (a, b) => b.searchFrequency - a.searchFrequency
  );

  console.log(sortedResponse.slice(0, 5));

  return response;
}
module.exports = getTopSearches;
