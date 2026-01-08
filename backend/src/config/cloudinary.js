const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        const isVideo = file.mimetype.startsWith('video');
        return {
            folder: 'appzeto',
            resource_type: 'auto', // Auto-detect for both images and videos
            public_id: `${file.fieldname}-${Date.now()}`,
            chunk_size: 6000000, // Important for larger videos
        };
    },
});

module.exports = { cloudinary, storage };
