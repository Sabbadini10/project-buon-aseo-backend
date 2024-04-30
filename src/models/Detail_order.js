const mongoose = require('mongoose');

const detailOrderSchema = new mongoose.Schema({
  quantity: Number,
  discount: Number,
  price: Number,
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  // product: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Product',
  // },
}, {
  timestamps: true,
  paranoid: true,
});

const DetailOrder = mongoose.model('DetailOrder', detailOrderSchema);

module.exports = DetailOrder;