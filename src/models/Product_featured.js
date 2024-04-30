const mongoose = require('mongoose');

const productFeaturedSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
}, {
  timestamps: true,
  paranoid: true,
});

const ProductFeatured = mongoose.model('ProductFeatured', productFeaturedSchema);

module.exports = ProductFeatured;
