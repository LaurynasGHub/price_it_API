const { Router } = require('express');
const { registerUser, logInUser, getUserName } = require('../controllers');

const router = Router();

// POST /user/register
router.post('/register', async (req, res) => {
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

// GET /user/:id
router.get('/username', async (req, res) => {
  try {
    const data = await getUserName(req.query.id);
    res.status(201).json(data);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
