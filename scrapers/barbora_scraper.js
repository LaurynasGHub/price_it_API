/**
 * Function gets results from Barbora e-shop.
 * @param {string} searchTerms string of what to search.
 * @returns {JSON}
 */
async function barboraScraper(searchTerms) {
  //shop URL (use bare domain to match cookie/domain)
  // const fetchUrl = 'https://barbora.lt/paieska?q=';
  const fetchUrl =
    'https://barbora.lt/api/eshop/v1/analyticsearch/query?&limit=5&query=';

  //combine everything to one string (encode query)
  const fullFetchUrl = `${fetchUrl}${searchTerms}`;

  try {
    const response = await fetch(fullFetchUrl, {
      headers: {
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'lt-LT,lt;q=0.9,en-US;q=0.8,en;q=0.7',
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Safari/537.36',
      },
      // leaving this here in case in the future this scraper would fail
      // this is the full headers captured from a real browser session
      // in case of breaking - try adding some of these headers
      // authority: 'barbora.lt',
      // method: 'GET',
      // path: '/paieska?q=pienas',
      // scheme: 'https',
      // accept:
      // 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      // accept_encoding: 'gzip, deflate, br, zstd',
      // accept_language: 'en-GB,en;q=0.7',
      // cookie:
      // 'X-Session-ID=14a23e6e-c86d-48fe-96f8-fd09449710c2; BN-Checkout-Test-Group=true; ConstructorioID_session_id=3; cf_clearance=QHtHk94ioMoVsTj_7SIH22wXycbsDeX3awyUwIlkuIQ-1763765160-1.2.1.1-61Bq5q.mMtt4RmYsk7Akt5keJfN.Du2Kwpj9Om1FUV_FLQ.MFcly060EOacbOg9iOb2SZf6BKYrBQeeaGXijW2bi9f4HAPo5yDTdKalwBLXShv7iyvWsseYwE3xNc7JuW_u_QRjhTtSOsHmQDrZlCCWhV.7MaUrWf.hTx6cMRmxT9ARZSpN7PU6SU7eiJUE9_UOFalpsCsXYHFrfJU8rNR8YLr6MXMhNWgo8y9tQi_I; ConstructorioID_client_id=b020d30d-ff1c-49ef-a392-131b71d8bc8d; ConstructorioID_session={"sessionId":3,"lastTime":1763765399090}; AWSALB=7+efakd6v4Vsyozu1c1YlDwLNq7cRpS6kwJoRZIymsrxedb7V6ZlVzYOqr90QPHOqJTUFnjt2HCZzU3y+ddUZsIxcV9S+g0kERCXA9l88/MMGh6mNmf4npnkTjNu; AWSALBCORS=7+efakd6v4Vsyozu1c1YlDwLNq7cRpS6kwJoRZIymsrxedb7V6ZlVzYOqr90QPHOqJTUFnjt2HCZzU3y+ddUZsIxcV9S+g0kERCXA9l88/MMGh6mNmf4npnkTjNu',
      // priority: 'u=0, i',
      // referer:
      // 'https://barbora.lt/?utm_source=google&utm_medium=cpc&utm_content=brand&gad_source=1&gad_campaignid=1506801806&gbraid=0AAAAAC-uj-zolSuKhQuG6QMwUL4RNRwS1',
      // sec_ch_ua: '"Chromium";v="142", "Brave";v="142", "Not_A Brand";v="99"',
      // sec_ch_ua_mobile: '?0',
      // sec_ch_ua_platform: '"macOS"',
      // sec_fetch_dest: 'document',
      // sec_fetch_mode: 'navigate',
      // sec_fetch_site: 'same-origin',
      // sec_fetch_user: '?1',
      // sec_gpc: 1,
      // upgrade_insecure_requests: 1,
      // user_agent:
      //   'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36});',
    });

    if (!response.ok) {
      console.error(` > Barbora HTTP error! Status: ${response.status}`);

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
    console.log(returnJson);

    return returnJson;
  } catch (error) {
    console.error('Error:', error);
    return;
  }
}

// barboraScraper('pienas');
module.exports = barboraScraper;
// export default barboraScraper;
