const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['customer', 'seller'] },

  customerId: String,
  sellerId: String,

  shopName: String,
  status: { type: String, default: 'approved' } // 🔥 important
});

module.exports = mongoose.model('User', userSchema);