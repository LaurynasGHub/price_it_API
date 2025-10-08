const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

app.options('*', cors()); // Handling pre-flight OPTIONS request globally

app.use(
  cors({
    // origin: 'https://price-it.vercel.app',
    origin: ['https://price-it.vercel.app', 'http://localhost:3001'],
    // allowedOrigins:

    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use(express.json());

//routes
app.use('/scrapers', require('./routes/scraperGetter.routes'));

// console.log(` >>> MONGO_DB_URI:\n${process.env.MONGO_DB_URI}\n`);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);

    console.log('Database connected');
  } catch (err) {
    console.log('index.js Error:', err.message);
  }
};

connectDB();

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
