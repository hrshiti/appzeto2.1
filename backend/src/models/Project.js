const mongoose = require('mongoose');
const slugify = require('slugify');

const featureSchema = new mongoose.Schema({
    label: { type: String, required: true },
    icon: { type: String, default: 'CheckCircle' } // Icon name (string) to be mapped on frontend
});

const statSchema = new mongoose.Schema({
    label: { type: String, required: true },
    value: { type: String, required: true }
});

const testimonialSchema = new mongoose.Schema({
    text: { type: String },
    author: { type: String },
    role: { type: String },
    avatar: { type: String }
});

const projectSchema = new mongoose.Schema({
    // --- Identity ---
    title: {
        type: String,
        required: [true, 'Project title is required'],
        trim: true,
        unique: true
    },
    slug: {
        type: String,
        unique: true
    },
    category: {
        type: String, // e.g., Fintech, E-commerce
        required: true
    },
    industry: {
        type: String
    },

    // --- Listing Page Data ---
    thumbnail: {
        type: String,
        required: [true, 'Thumbnail image is required']
    },
    shortDescription: {
        type: String,
        required: true,
        maxLength: [150, 'Short description cannot exceed 150 characters']
    },
    techTags: [{ // e.g., ["React", "Node", "AWS"]
        type: String
    }],
    isFeatured: {
        type: Boolean,
        default: false
    },
    orderIndex: {
        type: Number,
        default: 0
    },

    // --- Detail Page: Hero ---
    hero: {
        title: String, // Can differ from main title if needed
        subtitle: String,
        coverImage: String,
        videoUrl: String
    },

    // --- Detail Page: Info Card ---
    info: {
        client: String,
        year: String,
        duration: String,
        technologies: [ // Detailed tech stack with icons
            {
                name: String,
                icon: String
            }
        ]
    },

    // --- Detail Page: Overview ---
    overview: {
        text: String,
        mediaUrl: String, // Image or Video URL
        mediaType: { type: String, enum: ['image', 'video'], default: 'image' }
    },

    // --- Detail Page: Challenge & Solution ---
    challenge: {
        description: String,
        points: [String]
    },
    solution: {
        description: String,
        points: [String]
    },

    // --- Detail Page: Media Showcase ---
    showcase: {
        images: [String], // Array of URLs
        videos: [String] // Array of URLs
    },

    // --- Detail Page: Features & Stats ---
    features: [featureSchema],
    results: [statSchema],

    // --- Detail Page: Testimonial ---
    testimonial: testimonialSchema,

    // --- Detail Page: CTA ---
    cta: {
        title: { type: String, default: "Want a project like this?" },
        buttonLabel: { type: String, default: "Start a Project" },
        buttonLink: { type: String, default: "/contact" }
    }

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Auto-generate slug from title before saving
// Auto-generate slug from title before saving
projectSchema.pre('save', async function () {
    if (this.isModified('title')) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
});

module.exports = mongoose.model('Project', projectSchema);
