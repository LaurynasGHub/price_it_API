const Options = require('../models/optionsModel');

async function createProfileOptions(params) {
  console.log(' >>> createProfileOptions params- ', params);

  const serverMainProducts = await Options.find({ userID: params.userID });

  console.log('\n', serverMainProducts, '\n');

  if (serverMainProducts.length < 1) {
    // console.log(' <><><><><><><><>');

    // serverMainProducts[0].mainProducts.push(params.product);

    const newMainProducts = [params.product];

    // console.log('PRODUCTS- ', serverMainProducts);
    // WONT FIND?
    const newUserOptions = await Options.findOneAndUpdate(
      { userID: params.userID },
      { $set: { mainProducts: newMainProducts } }, // Set a new array
      { returnDocument: 'after', upsert: true } // 'upsert' creates a new document if none exists
    );

    // console.log('newUserOptions- ', newUserOptions);

    return newUserOptions;
  }

  console.log('\n', serverMainProducts[0].mainProducts, '\n');
  const iterProd = serverMainProducts[0].mainProducts;

  if (iterProd.includes(params.product)) {
    throw new Error('Option already exists');
  }

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

// createProfileOptions('');
module.exports = createProfileOptions;
