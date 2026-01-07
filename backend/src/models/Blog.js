const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    content: { type: String, required: true },
    thumbnail: { type: String, default: '' },
    author: { type: String, default: 'Admin' },
    active: { type: Boolean, default: true },
    seoTitle: String,
    seoDesc: String,
    tags: [String],
    views: { type: Number, default: 0 }
}, { timestamps: true });

blogSchema.pre('save', function (next) {
    if (this.isModified('title')) {
        this.slug = this.title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
    }
    next();
});

module.exports = mongoose.model('Blog', blogSchema);
