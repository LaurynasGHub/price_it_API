const { Router } = require('express');
const { createProfileOptions, getProfileOptions } = require('../controllers');
const { get } = require('mongoose');
const { create } = require('../models/searchModel');

const router = Router();

// POST /user
router.get('/', async (req, res) => {
  try {
    const data = await getProfileOptions(req.body);
    res.status(201).json(data);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
});

// POST /user/login

router.post('/create', async (req, res) => {
  try {
    const data = await createProfileOptions(req.body);
    res.status(201).json(data);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
