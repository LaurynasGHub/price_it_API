const { Router } = require('express');
const { getBarboraScraperResults } = require('../controllers');
const { getRimiScraperResults } = require('../controllers');

const router = Router();

//GET /scrapers
// Barbora scraper
router.get('/barbora', async (req, res) => {
  try {
    const data = await getBarboraScraperResults();
    res.json(data);
  } catch (error) {
    console.log('Error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

// Rimi scraper
router.get('/rimi', async (req, res) => {
  try {
    const data = await getRimiScraperResults();
    res.json(data);
  } catch (error) {
    console.log('Error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
