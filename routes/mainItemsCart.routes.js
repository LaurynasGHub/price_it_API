const { Router } = require('express');
const mainItemsCartPrice = require('../controllers/mainItemsCartPrice');

const router = Router();

router.get('/results', async (req, res) => {
  try {
    const response = await mainItemsCartPrice();

    res.json(response);
  } catch (error) {
    console.log('Error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
