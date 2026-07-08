const express = require('express');
const router = express.Router();
const { sendOTP, verifyOTP, getUser, updateProfile } = require('../controllers/authController');
const auth = require('../middleware/auth');

// Send OTP
router.post('/send-otp', sendOTP);

// Verify OTP
router.post('/verify-otp', verifyOTP);

// Get current user
router.get('/me', auth, getUser);

// Update profile
router.put('/profile', auth, updateProfile);

module.exports = router;
