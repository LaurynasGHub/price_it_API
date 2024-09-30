//
// Function should make request to Barbora e-shop and return
// JSON type result
//
const lastMileScraper = require('../scrapers/last_mile_scraper');

async function getLastMileScraperResults(params) {
  console.log(' > Last Mile Scraper Results');

  console.log(` >> Search params- ${params}`);

  const scraperResult = await lastMileScraper([params]);

  return scraperResult;
}

module.exports = getLastMileScraperResults;
