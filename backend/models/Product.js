const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    enum: ['Stationery', 'Electronics'],
    required: true
  },
  image: {
    type: String
  },
  stock: {
    type: Number,
    default: 0
  },
  deliveryCharge: {
    type: Number,
    default: 1 // 1 rupee per item
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
