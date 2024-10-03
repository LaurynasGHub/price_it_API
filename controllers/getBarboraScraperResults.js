//
// Function should make request to Barbora e-shop and return
// JSON type result
//
const barboraScraper = require('../scrapers/barbora_scraper');

async function getBarboraScraperResults(params) {
  console.log(' > Barbora Scraper');

  const scraperResult = await barboraScraper([params]);

  return scraperResult;
}

module.exports = getBarboraScraperResults;
