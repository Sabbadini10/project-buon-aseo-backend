const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: Number,
  dni: Number,
  birthday: Date,
  nationality: String,
  postal_code: String,
  address: String,
  city: String,
  avatar: String,
  is_admin: Boolean,
  id_type_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Type_user',
  },
  id_gender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gender',
  },
  id_order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  },
  resetToken: { type: String },
  resetTokenExpiration: { type: Date }
}, {
  timestamps: true,
  paranoid: true,
});

userSchema.pre('save', function (next) {
  // Perform any operations before saving, such as password hashing
  next(); // Call next() to continue saving
});
const User = mongoose.model('User', userSchema);

module.exports = User;