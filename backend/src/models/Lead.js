const mongoose = require('mongoose');
const leadSchema = new mongoose.Schema({
    name: String,
    company: String,
    email: String,
    phone: String,
    service: String,
    budget: String,
    message: String,
    leadType: { type: String, default: 'Sales' }, // 'Sales' or 'Partner'
    status: { type: String, default: 'New' },
    notes: { type: [String], default: [] }
}, { timestamps: true });
module.exports = mongoose.model('Lead', leadSchema);
