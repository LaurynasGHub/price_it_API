const { Router } = require('express');
const {
  createProfileOptions,
  getProfileOptions,
  deleteProfileOption,
} = require('../controllers');

const router = Router();

router.get('', async (req, res) => {
  try {
    const data = await getProfileOptions(req.query.id);
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

router.post('/delete', async (req, res) => {
  try {
    const data = await deleteProfileOption(req.body);
    res.status(201).json(data);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
