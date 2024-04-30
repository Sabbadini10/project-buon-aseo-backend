const mongoose = require('mongoose');

const letterImagePaymentSchema = new mongoose.Schema({
  letter: String,
  paymentMethod: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PaymentMethod', // Reference the associated 'PaymentMethod' model
    required: true,
  },
}, {
  timestamps: true,
  paranoid: true,
});

const LetterImagePayment = mongoose.model('LetterImagePayment', letterImagePaymentSchema);

module.exports = LetterImagePayment;