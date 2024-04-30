const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema({
  icon: String,
  title: String,
  bottom_letter_title: String,
  bottom_letter_full: String,
  letterImagePayments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LetterImagePayment',
  }],
  filesPayments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FilesPayment',
  }],
}, {
  timestamps: true,
  paranoid: true,
});

const PaymentMethod = mongoose.model('PaymentMethod', paymentMethodSchema);

module.exports = PaymentMethod;