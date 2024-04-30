const mongoose = require('mongoose'); // Assuming you already have moment installed for formatting

const categorySchema = new mongoose.Schema({
  name: String,
  status: Number,
  createdAt: {
    type: Date,
    default: Date.now, // Set default value to current timestamp
  },
}, {
  timestamps: true, // Add timestamps for created and updated at (optional)
  paranoid: true, // Enable soft deletion (optional)
});

// Virtual property for formatted date (optional)
categorySchema.virtual('formattedCreatedAt').get(function() {
  return moment(this.createdAt).format('DD/MM/YYYY');
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;