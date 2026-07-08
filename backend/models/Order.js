const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: Number,
    price: Number
  }],
  subtotal: {
    type: Number,
    required: true
  },
  deliveryCharges: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Paid', 'Processing', 'Shipped', 'Delivered'],
    default: 'Pending'
  },
  paymentMethod: {
    type: String,
    default: 'UPI'
  },
  paymentId: {
    type: String
  },
  pdfFile: {
    type: String
  },
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    trim: true
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

module.exports = mongoose.model('Order', orderSchema);
