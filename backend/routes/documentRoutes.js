const express = require('express');
const multer = require('multer');
const { uploadDocument, getDocuments } = require('../controllers/documentController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/upload', authMiddleware, upload.single('file'), uploadDocument);
router.get('/', authMiddleware, getDocuments);

module.exports = router;
