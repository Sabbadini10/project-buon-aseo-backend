const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  status: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
  paranoid: true,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;