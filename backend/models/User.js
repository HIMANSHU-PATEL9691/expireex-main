const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['customer', 'seller'] },

  customerId: String,
  sellerId: String,

  shopName: String,
  status: { type: String, default: 'pending' }, // pending by default for sellers
  
  sellerProfile: {
    phone: String,
    address: String,
    city: String,
    pincode: String,
    shopType: String, // grocery, pharmacy, dairy, etc.
    licenseNo: String,
    yearsExperience: Number,
    businessDescription: String
  }
});

module.exports = mongoose.model('User', userSchema);