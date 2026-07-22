const express = require('express');
const multer = require('multer');
const { storage } = require('../config/storage');
const router = express.Router();

const upload = multer({
    storage,
    limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
});

router.post('/', (req, res, next) => {
    upload.single('image')(req, res, (err) => {
        console.log('Upload Request Headers:', req.headers['content-type']);
        console.log('Upload Request File:', req.file);
        if (err) {
            return res.status(400).json({ message: 'Image Upload Failed', error: err.message });
        }
        if (!req.file) {
            return res.status(400).send({ message: 'No file uploaded' });
        }
        res.send({
            message: 'File Uploaded to Server',
            url: `/uploads/${req.file.filename}`
        });
    });
});

router.post('/video', (req, res, next) => {
    upload.single('video')(req, res, (err) => {
        if (err) {
            console.error('Server Video Upload Error:', err);
            return res.status(400).json({ message: 'Video Upload Failed', error: err.message });
        }
        if (!req.file) {
            return res.status(400).send({ message: 'No file uploaded' });
        }
        res.send({
            message: 'Video Uploaded to Server',
            url: `/uploads/${req.file.filename}`
        });
    });
});

module.exports = router;
