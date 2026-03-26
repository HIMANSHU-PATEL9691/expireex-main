const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Food', 'Cosmetics', 'Medicine', 'Beverages', 'Dairy', 'Snacks'],
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
  originalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  discountPrice: {
    type: Number,
    required: true,
    min: 0
  },
  discountPercent: {
    type: Number,
    min: 0,
    max: 100
  },
  image: {
    type: String, // URL
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

// Virtual for daysLeft (computed)
productSchema.virtual('daysLeft').get(function() {
  const now = new Date();
  const expiry = new Date(this.expiryDate);
  const diffTime = expiry - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
});

// Virtual for urgency (based on daysLeft)
productSchema.virtual('urgency').get(function() {
  const days = this.daysLeft;
  if (days <= 7) return 'urgent';
  if (days <= 30) return 'moderate';
  return 'safe';
});

// Ensure virtuals in JSON
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);
