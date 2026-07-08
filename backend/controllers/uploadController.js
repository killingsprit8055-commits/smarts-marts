const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Upload = require('../models/Upload');
const { sendWhatsAppFile, sendWhatsAppMessage } = require('../utils/whatsapp');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Only allow PDF files
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Upload file
exports.uploadFile = upload.single('file');

exports.handleFileUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const userId = req.user.userId;
    const phoneNumber = req.user.phoneNumber;

    // Save upload record to database
    const uploadRecord = new Upload({
      userId,
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
      phoneNumber
    });

    await uploadRecord.save();

    // Send file to owner via WhatsApp
    const fileUrl = `${process.env.SERVER_URL || 'http://localhost:5000'}/uploads/${req.file.filename}`;
    
    const caption = `
PDF Upload from Customer

Customer Phone: ${phoneNumber}
File Name: ${req.file.originalname}
Upload ID: ${uploadRecord._id}
Time: ${new Date().toLocaleString()}
    `;

    await sendWhatsAppFile(process.env.OWNER_WHATSAPP, fileUrl, caption);

    // Send confirmation to customer
    const confirmationMessage = `
Your PDF has been received!

File Name: ${req.file.originalname}
Upload ID: ${uploadRecord._id}

We will process and contact you soon.
Thank you!
    `;

    await sendWhatsAppMessage(phoneNumber, confirmationMessage);

    uploadRecord.sentToWhatsApp = true;
    uploadRecord.whatsAppSentAt = new Date();
    await uploadRecord.save();

    res.status(201).json({
      message: 'File uploaded successfully',
      upload: uploadRecord
    });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading file', error: error.message });
  }
};

// Get user uploads
exports.getUserUploads = async (req, res) => {
  try {
    const uploads = await Upload.find({ userId: req.user.userId })
      .sort({ uploadedAt: -1 });

    res.json(uploads);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching uploads', error: error.message });
  }
};

// Delete upload
exports.deleteUpload = async (req, res) => {
  try {
    const upload = await Upload.findById(req.params.id);

    if (!upload) {
      return res.status(404).json({ message: 'Upload not found' });
    }

    // Delete file from storage
    if (fs.existsSync(upload.filePath)) {
      fs.unlinkSync(upload.filePath);
    }

    await Upload.findByIdAndDelete(req.params.id);

    res.json({ message: 'Upload deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting upload', error: error.message });
  }
};
