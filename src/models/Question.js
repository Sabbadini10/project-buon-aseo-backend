const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  href: String,
  a: String,
  responses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Response',
  }],
}, {
  timestamps: true, 
  paranoid: true, 
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;