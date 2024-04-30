const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
}, {
  timestamps: true, 
  paranoid: true,
});

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;