const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number
  },
  mimeType: {
    type: String
  },
  phoneNumber: {
    type: String,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  sentToWhatsApp: {
    type: Boolean,
    default: false
  },
  whatsAppSentAt: {
    type: Date
  }
});

module.exports = mongoose.model('Upload', uploadSchema);
