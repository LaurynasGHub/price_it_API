const Options = require('../models/optionsModel');

async function getProfileOptions(userID) {
  const userOptions = Options.findOne({ userID });

  console.log(userOptions);
}

module.exports = getProfileOptions;
