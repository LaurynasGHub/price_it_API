const { Router } = require('express');
const express = require('express');
const cors = require('cors');
const app = express();

const {
  getBarboraScraperResults,
  getRimiScraperResults,
  getLastMileScraperResults,
  getVynotekaScraperResults,
  addSearch,
} = require('../controllers/index');

const router = Router();

// GET /scrapers
// Get shops scraper results
router.get('/shops/results', async (req, res) => {
  try {
    // extract the search term from the query parameters
    const searchTerm = req.query.searchTerm;
    if (!searchTerm) {
      return res.status(400).json({ error: 'Search term is required' });
    }

    let returnJson = {};
    // Barbora scraper
    const barboraData = await getBarboraScraperResults(searchTerm);
    // Rimi scraper
    const rimiData = await getRimiScraperResults(searchTerm);
    // Last Mile scraper
    const lastMileData = await getLastMileScraperResults(searchTerm);

    returnJson.barbora = barboraData;

    returnJson.rimi = rimiData;

    returnJson.lastMile = lastMileData;

    res.json(returnJson);
    // check if json is not empty, if not-update search term frequency in the database
    if (
      returnJson.barbora.length > 0 ||
      returnJson.rimi.length > 0 ||
      returnJson.lastMile.length > 0
    ) {
      addSearch(req.query.searchTerm);
    }
  } catch (error) {
    console.log('Error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

// Get alcohol shops scraper results
router.get('/shops/alcohol/results', async (req, res) => {
  try {
    // extract the search term from the query parameters
    const searchTerm = req.query.searchTerm;
    if (!searchTerm) {
      return res.status(400).json({ error: 'Search term is required' });
    }
    // update search term frequency in the database
    // Alcohol shops diff db?
    // addSearch(req.query.searchTerm);

    let returnJson = {};
    // Vynoteka scraper
    const vynotekaData = await getVynotekaScraperResults(searchTerm);

    returnJson.vynoteka = vynotekaData;

    res.json(returnJson);
  } catch (error) {
    console.log('Error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
