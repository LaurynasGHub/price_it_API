const { Router } = require('express');
const { getTopSearches, addSearch } = require('../controllers/index');

const router = Router();

router.get('/results', async (req, res) => {
  try {
    const response = await getTopSearches();

    res.json(response);
  } catch (error) {
    console.log('Error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

router.post('/results', async (req, res) => {
  try {
    const response = await addSearch(req.body);

    res.send(response);
  } catch (error) {
    console.log('Error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
