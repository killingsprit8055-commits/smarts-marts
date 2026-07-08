const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { sendOTP } = require('../utils/whatsapp');

// Generate random OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP to phone
exports.sendOTP = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // Valid for 10 minutes

    // Find or create user
    let user = await User.findOne({ phoneNumber });
    if (!user) {
      user = new User({ phoneNumber });
    }

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Send OTP via WhatsApp (for demo, also log it)
    console.log(`OTP for ${phoneNumber}: ${otp}`);
    // await sendOTP(phoneNumber, otp);

    res.json({
      message: 'OTP sent successfully',
      // For development - remove in production
      otpDemo: otp
    });
  } catch (error) {
    res.status(500).json({ message: 'Error sending OTP', error: error.message });
  }
};

// Verify OTP and login
exports.verifyOTP = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;

    if (!phoneNumber || !otp) {
      return res.status(400).json({ message: 'Phone number and OTP are required' });
    }

    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if OTP is expired
    if (new Date() > user.otpExpiry) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // Check if OTP matches
    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // OTP verified
    user.isVerified = true;
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, phoneNumber: user.phoneNumber },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '30d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        phoneNumber: user.phoneNumber,
        name: user.name
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying OTP', error: error.message });
  }
};

// Get current user
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-otp -otpExpiry');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { name },
      { new: true }
    ).select('-otp -otpExpiry');

    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
};
