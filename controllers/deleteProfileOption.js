const Options = require('../models/optionsModel');

async function deleteProfileOption(params) {
  // console.log('params- ', params);

  const serverMainProducts = await Options.find({ userID: params.userID });

  // console.log('\n', serverMainProducts[0].mainProducts, '\n');

  for (i = 0; i < serverMainProducts[0].mainProducts.length; i++) {
    if (serverMainProducts[0].mainProducts[i] == params.product) {
      serverMainProducts[0].mainProducts.splice(i, 1);
    }
  }

  const newUserOptions = await Options.findOneAndUpdate(
    { userID: params.userID },
    { $set: { mainProducts: serverMainProducts[0].mainProducts } },
    { returnDocument: 'after' }
  );

  // console.log('newUserOptions- ', newUserOptions);

  return newUserOptions;
}

module.exports = deleteProfileOption;
