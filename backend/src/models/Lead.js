const mongoose = require('mongoose');
const leadSchema = new mongoose.Schema({
    name: String,
    company: String,
    email: String,
    service: String,
    budget: String,
    status: { type: String, default: 'New' },
    notes: { type: [String], default: [] }
}, { timestamps: true });
module.exports = mongoose.model('Lead', leadSchema);
