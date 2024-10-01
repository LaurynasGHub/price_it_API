//
// Function gets top search results from server.
//
const searchModel = require('../models/searchModel.js');

async function getTopSearches() {
  console.log(' > Get top searches');

  const response = await searchModel.find();

  console.log(response);

  return getTopSearches;
}
module.exports = getTopSearches;
