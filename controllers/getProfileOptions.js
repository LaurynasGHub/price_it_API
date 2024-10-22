const Options = require('../models/optionsModel');

async function getProfileOptions(id) {
  const userOptions = await Options.findOne({ userID: id });

  // return userOptions.mainProducts;
  return userOptions;
}

module.exports = getProfileOptions;
