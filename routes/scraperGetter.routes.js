const { Router } = require('express');
const {
  getBarboraScraperResults,
  getRimiScraperResults,
} = require('../controllers/index');

const router = Router();

//GET /scrapers
// Barbora scraper
router.get('/barbora', async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm; // extract the search term from the query parameters
    if (!searchTerm) {
      return res.status(400).json({ error: 'Search term is required' });
    }
    const data = await getBarboraScraperResults(searchTerm);
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
