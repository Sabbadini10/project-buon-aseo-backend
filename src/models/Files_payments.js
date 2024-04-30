const mongoose = require('mongoose');

const filesPaymentSchema = new mongoose.Schema({
  file: String,
  paymentMethod: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PaymentMethod',
    required: true,
  },
}, {
  timestamps: true,
  paranoid: true,
});

const FilesPayment = mongoose.model('FilesPayment', filesPaymentSchema);

module.exports = FilesPayment;