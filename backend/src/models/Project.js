const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    text: { type: String, default: '' },
    author: { type: String, default: '' },
    role: { type: String, default: '' }
});

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a project title'],
        unique: true,
        trim: true
    },
    slug: {
        type: String,
        unique: true
    },
    subtitle: {
        type: String,
        default: ''
    },
    category: {
        type: String, // e.g., 'Web App', 'Fintech'
        required: true
    },
    industry: {
        type: String,
        default: ''
    },
    client: {
        type: String,
        default: ''
    },
    year: {
        type: String,
        default: ''
    },
    description: { // Changed from summary to match original structure
        type: String,
        default: ''
    },
    fullDescription: {
        type: String,
        required: [true, 'Please add a full description']
    },
    thumbnail: {
        type: String, // Main display image
        required: true
    },
    coverImage: { // Added to match original structure
        type: String,
        default: ''
    },
    images: {
        type: [String], // Gallery for slideshow
        default: []
    },
    tags: { // Changed from technologies to match original structure
        type: [String],
        default: []
    },
    challenge: {
        type: String,
        default: ''
    },
    solution: {
        type: String,
        default: ''
    },
    features: {
        type: [String], // List of core features
        default: []
    },
    results: {
        type: [String], // e.g., ["1M+ USERS", "40% INCREASE"]
        default: []
    },
    testimonial: {
        type: testimonialSchema,
        default: () => ({})
    },
    featured: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Create slug from title
projectSchema.pre('save', async function () {
    if (this.isModified('title')) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    }
    // Set coverImage to thumbnail if empty
    if (!this.coverImage) {
        this.coverImage = this.thumbnail;
    }
});

module.exports = mongoose.model('Project', projectSchema);
