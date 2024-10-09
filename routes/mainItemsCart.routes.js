const { Router } = require('express');
const mainItemsPrices = require('../controllers/mainItemsPrices');
const cartPrices = require('../controllers/cartPrices');

const router = Router();

router.get('/products/results', async (req, res) => {
  try {
    const response = await mainItemsPrices();

    res.json(response);
  } catch (error) {
    console.log('Error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

router.get('/cart/results', async (req, res) => {
  try {
    const response = await cartPrices();

    res.json(response);
  } catch (error) {
    console.log('Error:', error.message);
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;
