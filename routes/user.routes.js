const { Router } = require('express');
const { registerUser, logInUser } = require('../controllers');

const router = Router();

// POST /user
router.post('/', async (req, res) => {
  try {
    const data = await registerUser(req.body);
    res.status(201).json(data);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
});

// POST /user/login

router.post('/login', async (req, res) => {
  try {
    const data = await logInUser(req.body);
    res.status(201).json(data);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
