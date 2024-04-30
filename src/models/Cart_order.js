const mongoose = require('mongoose');

const cartOrderSchema = new mongoose.Schema({
  date: Date,
  total: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: String,
  carts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
  paranoid: false,
});


  cartOrderSchema.virtual('formattedCreatedAt').get(function() {
  return moment(this.createdAt).format('DD/MM/YYYY');
});  

const CartOrder = mongoose.model('CartOrder', cartOrderSchema);

module.exports = CartOrder;