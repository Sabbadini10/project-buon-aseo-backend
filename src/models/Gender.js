const mongoose = require('mongoose');

const genderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
}, {
  timestamps: true,
  paranoid: true,
});

const Gender = mongoose.model('Gender', genderSchema);

module.exports = Gender;