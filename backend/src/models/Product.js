const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    price: String, // String to allow currency symbols or text like "Free"
    description: String,
    image: String,
    images: { type: [String], default: [] },
    features: { type: [String], default: [] },
    category: String,
    link: String,
    active: { type: Boolean, default: true }
}, { timestamps: true });

productSchema.pre('save', function (next) {
    if (!this.slug) {
        this.slug = this.name.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
    }
    next();
});

module.exports = mongoose.model('Product', productSchema);
