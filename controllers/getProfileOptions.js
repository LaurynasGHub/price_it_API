const Options = require('../models/optionsModel');

async function getProfileOptions(params) {
  const userOptions = await Options.findOne({ userID: params.userID });

  return userOptions.mainProducts;
}

module.exports = getProfileOptions;
