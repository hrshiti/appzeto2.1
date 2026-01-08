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
    image: {
        type: String,
        default: ''
    },
    layoutType: {
        type: String,
        enum: ['web', 'app', 'generic'],
        default: 'web'
    },
    visualFilename: {
        type: String,
        default: 'App.tsx'
    },
    visualCode: {
        type: String,
        default: ''
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
serviceSchema.pre('save', async function () {
    if (this.title && !this.slug) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    }
});

module.exports = mongoose.model('Service', serviceSchema);
