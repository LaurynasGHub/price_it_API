const { Router } = require('express');
const { createProfileOptions, getProfileOptions } = require('../controllers');

const router = Router();

router.get('/:id', async (req, res) => {
  try {
    const data = await getProfileOptions(req.params.id);
    res.status(201).json(data);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
});

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
