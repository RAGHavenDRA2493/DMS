const Document = require('../models/Document');

// Upload Document
exports.uploadDocument = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    const document = await Document.create({
      name: file.originalname,
      path: file.path,
      uploadedBy: req.user.id,
    });

    res.status(201).json({ message: 'File uploaded successfully', document });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get Documents
exports.getDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ uploadedBy: req.user.id });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
