const Options = require('../models/optionsModel');

async function createProfileOptions(params) {
  // console.log('params- ', params);

  const serverMainProducts = await Options.find({ userID: params.userID });

  // console.log('\n', serverMainProducts[0].mainProducts, '\n');

  serverMainProducts[0].mainProducts.push(params.product);

  // console.log('PRODUCTS- ', serverMainProducts);

  const newUserOptions = await Options.findOneAndUpdate(
    { userID: params.userID },
    { $set: { mainProducts: serverMainProducts[0].mainProducts } },
    { returnDocument: 'after' }
  );

  // console.log('newUserOptions- ', newUserOptions);

  return newUserOptions;
}

module.exports = createProfileOptions;
