const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  cartOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CartOrder',
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
  quantity: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
  paranoid: false
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;