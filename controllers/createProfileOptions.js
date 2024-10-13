const Options = require('../models/optionsModel');

async function createProfileOptions(params) {
  console.log('params- ', params);

  const newUserOptions = await Options.create({
    userID: params.userID,
    mainProducts: params.mainProducts,
  });

  console.log('newUserOptions- ', newUserOptions);

  return newUserOptions;
}

module.exports = createProfileOptions;
