const mongoose = require('mongoose');

const interestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userInterest: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserInterest',
  }],
}, {
  timestamps: true,
  paranoid: true,
});

const Interest = mongoose.model('Interest', interestSchema);

module.exports = Interest;