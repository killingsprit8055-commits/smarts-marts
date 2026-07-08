const express = require('express');
const router = express.Router();
const {
  uploadFile,
  handleFileUpload,
  getUserUploads,
  deleteUpload
} = require('../controllers/uploadController');
const auth = require('../middleware/auth');

// Upload file
router.post('/', auth, uploadFile, handleFileUpload);

// Get user uploads
router.get('/', auth, getUserUploads);

// Delete upload
router.delete('/:id', auth, deleteUpload);

module.exports = router;
