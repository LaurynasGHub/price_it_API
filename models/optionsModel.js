const mongoose = require('mongoose');

const optionsModelSchema = new mongoose.Schema({
  userID: { type: String },

  mainProducts: [{ type: String }],
});

const optionsModel = mongoose.model('options', optionsModelSchema);

module.exports = optionsModel;
