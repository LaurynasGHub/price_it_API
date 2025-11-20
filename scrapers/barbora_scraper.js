// ...existing code...
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

// TODO
// Rewrite this similar to rimi scraper

/**
 * Function gets results from Barbora e-shop.
 * @param {string} searchTerms string of what to search.
 * @returns {JSON}
 */
async function barboraScraper(searchTerms) {
  //shop URL (use bare domain to match cookie/domain)
  const fetchUrl =
    'https://barbora.lt/api/eshop/v1/analyticsearch/query?&limit=5&query=';

  //combine everything to one string (encode query)
  const fullFetchUrl = `${fetchUrl}${encodeURIComponent(searchTerms)}`;

  // optional static cookie (may be stale) — keep for quick tries
  const cookie =
    'X-Session-ID=14a23e6e-c86d-48fe-96f8-fd09449710c2; BN-Checkout-Test-Group=true; AWSALB=...';

  try {
    const response = await fetch(fullFetchUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Cookie: cookie,
        Accept: 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9',
        Referer: 'https://barbora.lt/',
        Origin: 'https://barbora.lt',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'sec-ch-ua':
          '"Not.A/Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    });

    if (!response.ok) {
      console.error(` > Barbora HTTP error! Status: ${response.status}`);

      // If 403, use Puppeteer to fetch inside a real browser session (gets fresh cookies / passes JS challenges)
      if (response.status === 403) {
        console.error(
          ' > Falling back to Puppeteer browser fetch to obtain fresh session / bypass challenge...'
        );
        const browser = await puppeteer.launch({
          headless: false, // try false if challenge persists
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        try {
          const page = await browser.newPage();
          await page.setUserAgent(
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
          );
          // ...existing code...
          await page.goto('https://barbora.lt', {
            waitUntil: 'networkidle2',
            timeout: 60000,
          });

          // Wait for a visible element that means the page is loaded (e.g., the search bar)
          await page.waitForSelector('input[name="search"]', {
            timeout: 15000,
          });

          await new Promise((res) => setTimeout(res, 7000));

          // fetch API from within the browser context so Cloudflare trusts it
          const result = await page.evaluate(async (u) => {
            const r = await fetch(u, { credentials: 'same-origin' });
            if (!r.ok)
              return {
                __status: r.status,
                __text: await r.text().catch(() => ''),
              };
            return r.json();
          }, fullFetchUrl);
          // ...existing code...
          if (result && result.__status && result.__status !== 200) {
            console.error(
              ' > Browser fetch returned error status:',
              result.__status
            );
            console.error(result.__text?.slice(0, 800));
            await browser.close();
            return { products: [] };
          }

          const returnJson = { products: [] };
          for (let product of result.products || []) {
            returnJson.products.push({
              name: product.title,
              price: product.price,
            });
          }

          await browser.close();
          return returnJson;
        } catch (e) {
          await browser.close();
          console.error('Puppeteer error:', e);
          return { products: [] };
        }
      }

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

barboraScraper('pienas');
module.exports = barboraScraper;
// ...existing code...
