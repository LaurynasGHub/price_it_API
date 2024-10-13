//
// Function should make request to Barbora e-shop and return
// JSON type result
//
const lastMileScraper = require('../scrapers/last_mile_scraper');

async function getLastMileScraperResults(params) {
  const scraperResult = lastMileScraper([params]);

  return scraperResult;
}

module.exports = getLastMileScraperResults;
