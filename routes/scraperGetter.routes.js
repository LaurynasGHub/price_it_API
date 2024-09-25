const { Router } = require('express');
const {
  getBarboraScraperResults,
  getRimiScraperResults,
  getLastMileScraperResults,
} = require('../controllers/index');
// const rimiScraper = require('../scrapers/rimi_scraper');

const router = Router();

// GET /scrapers
// Get scraper results
router.get('/results', async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm; // extract the search term from the query parameters
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
  } catch (error) {
    console.log('Error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
