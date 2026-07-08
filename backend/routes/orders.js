const express = require('express');
const router = express.Router();
const {
  createOrder,
  verifyOrderPayment,
  getUserOrders,
  getOrderById
} = require('../controllers/orderController');
const auth = require('../middleware/auth');

// Create order
router.post('/', auth, createOrder);

// Verify payment
router.post('/verify-payment', auth, verifyOrderPayment);

// Get user orders
router.get('/', auth, getUserOrders);

// Get order by ID
router.get('/:id', auth, getOrderById);

module.exports = router;
