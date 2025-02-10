//
// Function should make request to Vynoteka e-shop and return
// JSON type result
//
const vynotekaScraper = require('../scrapers/vynoteka_scraper');

async function getVynotekaScraperResults(params) {
  const scraperResult = vynotekaScraper([params]);

  return scraperResult;
}

module.exports = getVynotekaScraperResults;
