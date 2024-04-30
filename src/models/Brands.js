const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  name: String,
  image: String,
}, {
  timestamps: true,
  paranoid: true,
});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;