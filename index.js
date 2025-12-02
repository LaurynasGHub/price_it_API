const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

app.options('*', cors());

app.use(
  cors({
    // allowedOrigins:
    origin: ['https://price-it.vercel.app', 'http://localhost:3001'],

    methods: ['GET'],
    allowedHeaders: ['Content-Type'],
  })
);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use(express.json());

//routes
app.use('/scrapers', require('./routes/scraperGetter.routes'));

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
