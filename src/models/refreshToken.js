const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const refreshSchema = new Schema({
  _userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Reference to the User model
  },
  token: {
    type: String,
    required: true,
    unique: true
  },
  expiryDate: {
    type: Date,
    required: true
  }
});

refreshSchema.statics.createToken = async function (user) {
  const expiredAt = new Date();
  expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration); // Assuming config.jwtRefreshExpiration holds expiration time in seconds

  const token = new this({
    _userId: user._id, // Use user's ID from the User model
    token: uuidv4(),
    expiryDate: expiredAt
  });

  await token.save();
  return token.token;
};

refreshSchema.statics.verifyExpiration = function (token) {
  return token.expiryDate.getTime() < Date.now();
};

module.exports = mongoose.model('RefreshToken', refreshSchema);