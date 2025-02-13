const Options = require('../models/optionsModel');

async function createProfileOptions(params) {
  const serverMainProducts = await Options.find({ userID: params.userID });

  console.log(`>>> Server main products\n ${serverMainProducts}`);

  if (serverMainProducts.length < 1) {
    const newMainProducts = [params.product];

    const newUserOptions = await Options.findOneAndUpdate(
      { userID: params.userID },
      { $set: { mainProducts: newMainProducts } },
      { returnDocument: 'after', upsert: true }
    );

    return newUserOptions;
  }

  const iterProd = serverMainProducts[0].mainProducts;

  if (iterProd.includes(params.product)) {
    throw new Error('Option already exists');
  }

  serverMainProducts[0].mainProducts.push(params.product);

  const newUserOptions = await Options.findOneAndUpdate(
    { userID: params.userID },
    { $set: { mainProducts: serverMainProducts[0].mainProducts } },
    { returnDocument: 'after' }
  );

  return newUserOptions;
}

module.exports = createProfileOptions;
