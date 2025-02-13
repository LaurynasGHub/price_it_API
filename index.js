const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

app.options('*', cors()); // Handling pre-flight OPTIONS request globally

app.use(
  cors({
    origin: 'https://price-it.vercel.app',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);

app.use(express.json());
app.get('/', (req, res) => res.send('Express on Vercel'));

//routes
app.use('/scrapers', require('./routes/scraperGetter.routes'));
app.use('/topSearches', require('./routes/topSearches.routes'));
app.use('/mainItems', require('./routes/mainItemsCart.routes'));
app.use('/user', require('./routes/user.routes'));
app.use('/options', require('./routes/options.routes'));

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
