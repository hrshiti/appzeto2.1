const mongoose = require('mongoose');

const partnerInquirySchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    contactPerson: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    businessType: String,
    message: String,
    status: { type: String, default: 'New', enum: ['New', 'Contacted', 'Partnered', 'Declined'] }
}, { timestamps: true });

module.exports = mongoose.model('PartnerInquiry', partnerInquirySchema);
