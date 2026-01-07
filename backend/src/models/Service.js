const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a service title'],
        unique: true,
        trim: true,
        maxlength: [50, 'Title cannot be more than 50 characters']
    },
    slug: {
        type: String,
        unique: true
    },
    icon: {
        type: String,
        default: 'code' // Default Material Icon
    },
    shortDescription: {
        type: String,
        required: [true, 'Please add a short description'],
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    fullDescription: {
        type: String,
        required: [true, 'Please add the full service content']
    },
    features: {
        type: [String],
        default: []
    },
    technologies: {
        type: [String],
        default: []
    },
    category: {
        type: String,
        default: 'Development'
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

// Create slug from title if not provided
serviceSchema.pre('save', function (next) {
    if (!this.slug) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    }
    next();
});

module.exports = mongoose.model('Service', serviceSchema);
