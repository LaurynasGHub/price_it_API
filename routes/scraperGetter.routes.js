const { Router } = require('express');

const allowedOrigins = require('../allowedOrigins.json');

const {
  getBarboraScraperResults,
  getRimiScraperResults,
  getLastMileScraperResults,
  getVynotekaScraperResults,
} = require('../controllers/index');

const router = Router();

// Get shops scraper results
router.get('/shops/results', async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;

    if (!allowedOrigins.includes(req.headers.origin)) {
      return res.status(520).json({ error: 'Unknown error' });
    }

    if (!searchTerm) {
      return res.status(400).json({ error: 'Search term is required' });
    }

    let returnJson = {};
    const [barboraData, rimiData, lastMileData] = await Promise.all([
      getBarboraScraperResults(searchTerm),
      getRimiScraperResults(searchTerm),
      getLastMileScraperResults(searchTerm),
    ]);

    returnJson.barbora = barboraData;
    returnJson.rimi = rimiData;
    returnJson.lastMile = lastMileData;

    res.json(returnJson);
  } catch (error) {
    console.log('Error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

// Get alcohol shops scraper results
router.get('/shops/alcohol/results', async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;

    if (!allowedOrigins.includes(req.headers.origin)) {
      return res.status(520).json({ error: 'Unknown error' });
    }

    if (!searchTerm) {
      return res.status(400).json({ error: 'Search term is required' });
    }

    let returnJson = {};

    const vynotekaData = await getVynotekaScraperResults(searchTerm);

    returnJson.vynoteka = vynotekaData;

    res.json(returnJson);
  } catch (error) {
    console.log('Error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
