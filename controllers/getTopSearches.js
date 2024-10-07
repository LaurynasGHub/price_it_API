/**
 * Gets top search results from the server.
 * @returns {JSON}
 */
const searchModel = require('../models/searchModel.js');

async function getTopSearches() {
  const response = await searchModel.find();

  const sortedResponse = response.sort(
    (a, b) => b.searchFrequency - a.searchFrequency
  );

  const returnResponse = sortedResponse.slice(0, 5);

  return returnResponse;
}
module.exports = getTopSearches;
