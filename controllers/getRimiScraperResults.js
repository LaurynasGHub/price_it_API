//
// Function should make request to Rimi e-shop and return
// JSON type result
//
const rimiScraper = require('../scrapers/rimi_scraper');

async function getRimiScraperResults(params) {
  console.log(' > Rimi Scraper');

  const scraperResult = await rimiScraper([params]);

  return scraperResult;
}

module.exports = getRimiScraperResults;
