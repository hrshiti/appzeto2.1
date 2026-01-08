const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    jobTitle: String,
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    portfolio: String,
    resumeUrl: String, // Cloudinary URL
    coverLetter: String,
    status: { type: String, default: 'Pending', enum: ['Pending', 'Reviewed', 'Accepted', 'Rejected'] }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
