const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    jobTitle: String,
    name: String,
    email: String,
    phone: String,
    portfolio: String,
    resumeUrl: String, // Cloudinary URL
    coverLetter: String,
    status: { type: String, default: 'Pending', enum: ['Pending', 'Reviewed', 'Accepted', 'Rejected'] }
}, { timestamps: true, strict: false });

module.exports = mongoose.model('Application', applicationSchema);
