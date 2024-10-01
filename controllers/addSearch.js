const searchModel = require('../models/searchModel.js');
const searchValidation = require('../validation/searchValidation.js');

// POST /search
async function addSearch(props) {
  searchValidation(props);

  const response = await searchModel.create(props);

  return response;
}

module.exports = addSearch;
