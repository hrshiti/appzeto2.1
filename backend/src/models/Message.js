const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    reason: String,
    message: String,
    status: { type: String, default: 'New' } // New, Read, Replied
}, { timestamps: true });
module.exports = mongoose.model('Message', messageSchema);
