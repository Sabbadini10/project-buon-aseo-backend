const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  quantity: Number,
  cartOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CartOrder',
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
}, {
  timestamps: true,
  paranoid: false
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;