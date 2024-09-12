async function barboraScraper(searchTerms) {
  console.log(' > Barbora scraper function');

  //shop URL
  let fetchUrl =
    // 'https://www.barbora.lt/api/eshop/v1/analyticsearch/query?hideInactiveInventories=true&hideInactiveSuggestions=true&mergeSuggestionsIntoResults=true&mergeSuggestionsIntoResultsOnlyUpToTheLimit=true&limit=5&isQuickSearch=true&query=';
    // shop url without some options, added is only search terms and limit
    // TODO
    // make limit changeable from 5 to input value
    // change provided values from array to string?
    // then replace spaces with +?
    'https://www.barbora.lt/api/eshop/v1/analyticsearch/query?&limit=5&query=';

  //combine the search terms
  let fullSearchTerms = searchTerms.join('+');

  //combine everything to one string
  let fullFetchUrl = `${fetchUrl}+${fullSearchTerms}`;
  console.log(` >> fullFetchUrl- ${fullFetchUrl}`);

  const response = await fetch(fullFetchUrl);
  const result = await response.json();

  let returnJson = { products: [] };

  for (let product of result.products) {
    console.log('===');
    console.log(`${product.title} kaina ${product.price} eur.`);

    let pushProduct = {
      name: product.title,
      price: product.price,
    };

    returnJson.products.push(pushProduct);
  }

  return returnJson;
}

module.exports = barboraScraper;
// export { barboraScraper };
// barboraScraper(['pienas']);
