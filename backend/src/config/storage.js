const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const uploadDir = path.join(__dirname, '../../public/uploads');
const projectsUploadDir = path.join(__dirname, '../../public/uploads/projects');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
if (!fs.existsSync(projectsUploadDir)) {
    fs.mkdirSync(projectsUploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Clean original filename by replacing spaces and special chars
        const cleanName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(cleanName) || '';
        const baseName = path.basename(cleanName, ext);
        cb(null, `${file.fieldname}-${baseName}-${uniqueSuffix}${ext}`);
    }
});

module.exports = { storage, uploadDir, projectsUploadDir };
