const mongoose = require('mongoose');

const fundSchema = new mongoose.Schema({
  name: String,
  category: String,
  trailingReturns: {
    '1': Number,
    '3': Number,
    '5': Number,
    '7': Number,
    '10': Number
  }
});


module.exports = mongoose.model('Fund', fundSchema);
