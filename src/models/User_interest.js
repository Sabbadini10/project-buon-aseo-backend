const mongoose = require('mongoose');

const userInterestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  interest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interest',
    required: true,
  },
}, {
  timestamps: true,
});

const UserInterest = mongoose.model('UserInterest', userInterestSchema);

module.exports = UserInterest;