//
// Function should make request to Barbora e-shop and return
// JSON type result
//
const barboraScraper = require('../scrapers/barbora_scraper');

async function getBarboraScraperResults(params) {
  const scraperResult = barboraScraper([params]);

  return scraperResult;
}

module.exports = getBarboraScraperResults;
