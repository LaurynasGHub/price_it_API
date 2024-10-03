const searchModel = require('../models/searchModel.js');

// POST /search
async function addSearch(searchTerm) {
  // get the searchTerm search frequency
  const searchObject = await searchModel.find({ searchTerm: searchTerm });

  if (searchObject.length < 1) {
    // because length is 0 that means that search term is searched for the first time
    const response = await searchModel.create({
      searchTerm: searchTerm,
      searchFrequency: 1,
    });

    return response;
  } else {
    const searchFrequency = searchObject[0].searchFrequency + 1;

    // find model by searchTerm and increase searchFrequency
    response = await searchModel.findOneAndUpdate(
      { searchTerm: searchTerm },
      { searchFrequency: searchFrequency }
    );

    return response;
  }
}

module.exports = addSearch;
