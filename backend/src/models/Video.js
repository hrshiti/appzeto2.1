const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    category: { type: String, default: 'Demo' },
    thumbnail: String,
    duration: String,
    featured: { type: Boolean, default: false },
    description: String,
    visibility: { type: String, default: 'Public' } // Public, Private
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);
