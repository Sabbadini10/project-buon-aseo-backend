const mongoose = require('mongoose');

const shippingPriceSchema = new mongoose.Schema({
  province: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
  paranoid: true,
});


shippingPriceSchema.methods.getFormattedCreatedAt = function () {
  return this.createdAt.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const ShippingPrice = mongoose.model('ShippingPrice', shippingPriceSchema);

module.exports = ShippingPrice;