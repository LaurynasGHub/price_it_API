const { Router } = require('express');
const { getTopSearches, addSearch } = require('../controllers/index');

const router = Router();

router.get('/results', async (req, res) => {
  try {
    const response = await getTopSearches();

    res.status(200).json(response);
  } catch (error) {
    console.log('Error:', error.message);
    res.status(400).json({ error: error.message });
  }
});
// route was used to test frequency update in database
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
