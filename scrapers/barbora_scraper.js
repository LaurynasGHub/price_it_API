/**
 * Function gets results from Barbora e-shop.
 * @param {string} searchTerms string of what to search.
 * @returns {JSON}
 */

async function barboraScraper(searchTerms) {
  //shop URL
  const fetchUrl =
    'https://www.barbora.lt/api/eshop/v1/analyticsearch/query?&limit=5&query=';

  //combine everything to one string
  const fullFetchUrl = `${fetchUrl}${searchTerms}`;

  try {
    const response = await fetch(fullFetchUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'application/json, text/plain, */*',
        Referer: 'https://www.barbora.lt/',
      },
    });

    // cloudflare bot protection is fortified, tried this:
    // const response = await fetch(fullFetchUrl, {
    //       headers: {
    //         'User-Agent':
    //           'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    //         Accept: 'application/json, text/plain, */*',
    //         'Accept-Language': 'en-US,en;q=0.9',
    //         Connection: 'keep-alive',
    //         Origin: 'https://barbora.lt',
    //         Referer: 'https://barbora.lt/',
    //         'Sec-Fetch-Site': 'same-origin',
    //         'Sec-Fetch-Mode': 'cors',
    //         'Sec-Fetch-Dest': 'empty',
    //         'sec-ch-ua':
    //           '"Not.A/Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
    //         'sec-ch-ua-mobile': '?0',
    //         'sec-ch-ua-platform': '"macOS"',
    //       },
    //     });
    // still not working properly
    // wait for cloudflare to get back up from outage, then try again

    if (!response.ok) {
      console.error(` > Barbora HTTP error! Status: ${response.status}`);
      // return empty JSON on error, don't throw to prevent breaking other scrapers
      return { products: [] };
    }

    const result = await response.json();

    let returnJson = { products: [] };

    for (let product of result.products) {
      let pushProduct = {
        name: product.title,
        price: product.price,
      };

      returnJson.products.push(pushProduct);
    }

    return returnJson;
  } catch (error) {
    console.error('Error:', error);
    return;
  }
}

module.exports = barboraScraper;
