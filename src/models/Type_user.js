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


/* typeUserSchema.pre('save', async function (next) {
  if (this.isModified('name') && this.name === 'admin') {
    const existingAdmin = await UserType.findOne({ name: 'admin' });
    if (existingAdmin && !existingAdmin._id.equals(this._id)) {
      const error = new Error('Only one admin user is allowed');
      return next(error);
    }
  }
  next();
}); */


const TypeUser = mongoose.model('Type_user', typeUserSchema);

module.exports = TypeUser;