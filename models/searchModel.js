const mongoose = require('mongoose');

const searchModelSchema = new mongoose.Schema({
  searchTerm: {
    type: String,
    required: true,
  },
  searchFrequency: {
    type: Number,
    required: true,
  },
});

const searchModel = mongoose.model('Price-it', searchModelSchema, 'searches');

module.exports = searchModel;
