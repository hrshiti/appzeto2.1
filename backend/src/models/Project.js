const mongoose = require('mongoose');

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
    category: {
        type: String, // e.g., 'Web App', 'Mobile App', 'AI'
        required: true
    },
    summary: {
        type: String,
        required: [true, 'Please add a summary'],
        maxlength: 300
    },
    fullDescription: {
        type: String,
        required: [true, 'Please add a full description']
    },
    thumbnail: {
        type: String, // URL
        required: true
    },
    images: {
        type: [String], // Array of URLs
        default: []
    },
    technologies: {
        type: [String],
        default: []
    },
    year: String,
    industry: String,
    subtitle: String,
    challenge: String,
    solution: String,
    results: [String],
    testimonial: {
        text: String,
        author: String,
        role: String
    },
    client: {
        type: String
    },
    siteLink: {
        type: String
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
projectSchema.pre('save', function (next) {
    this.slug = this.title
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
    next();
});

module.exports = mongoose.model('Project', projectSchema);
