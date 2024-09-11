//
// Function should make request to Barbora e-shop and return
// JSON type result
//
const { response } = require('express');
const barboraScraper = require('../scrapers/barbora_scraper');

async function getBarboraScraperResults(params) {
  console.log(' > Barbora Scraper Results');

  console.log(` >> Search params- ${params}`);

  const scraperResult = await barboraScraper([params]);
}

module.exports = getBarboraScraperResults;
