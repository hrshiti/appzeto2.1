const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
    label: { type: String, default: '' },
    subtext: { type: String, default: '' }
});

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    slug: {
        type: String,
        unique: true
    },
    tag: {
        type: String,
        default: 'General'
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    excerpt: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        default: ''
    },
    featuredImage: {
        type: String,
        default: ''
    },
    stats: {
        type: [statSchema],
        validate: [v => v.length <= 3, 'Cannot have more than 3 stats']
    },
    active: {
        type: Boolean,
        default: true
    },
    author: {
        type: String,
        default: 'Admin'
    }
}, { timestamps: true });

blogSchema.pre('save', async function () {
    if (this.isModified('title') && this.title) {
        this.slug = this.title
            .toLowerCase()
            .trim()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    }
});

module.exports = mongoose.model('Blog', blogSchema);
