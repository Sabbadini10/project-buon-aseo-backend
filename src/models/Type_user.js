const mongoose = require('mongoose');

const typeUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  paranoid: true,
});

const TypeUser = mongoose.model('Type_user', typeUserSchema);

module.exports = TypeUser;