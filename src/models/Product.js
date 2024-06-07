const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  idCode: Number,
  price: Number,
  discount: Number,
  volume: String,
  stock: Number,
  smell: String,
 /*  dimensions: Number,
  quantity: Number,
  type: String, */
  description: String,
  image: String,
  /* status: Number, */
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
}, {
  timestamps: true,
  paranoid: true,
});



const Product = mongoose.model('Product', productSchema);

module.exports = Product;
