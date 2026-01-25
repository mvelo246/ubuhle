const express = require('express');
const router = express.Router();
const path = require('path');
const { uploadImage, uploadAudio } = require('../config/multer');
const { protect, adminOnly } = require('../middleware/auth');

// Upload image
router.post('/image', protect, adminOnly, uploadImage.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No file uploaded',
    });
  }

  const filePath = `/uploads/images/${req.body.type || 'general'}/${req.file.filename}`;
  
  res.json({
    success: true,
    data: {
      filename: req.file.filename,
      path: filePath,
      url: `${req.protocol}://${req.get('host')}${filePath}`,
    },
  });
});

// Upload audio
router.post('/audio', protect, adminOnly, uploadAudio.single('audio'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No file uploaded',
    });
  }

  const filePath = `/uploads/audio/${req.file.filename}`;
  
  res.json({
    success: true,
    data: {
      filename: req.file.filename,
      path: filePath,
      url: `${req.protocol}://${req.get('host')}${filePath}`,
    },
  });
});

module.exports = router;
