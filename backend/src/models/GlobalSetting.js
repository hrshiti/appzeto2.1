const mongoose = require('mongoose');

const globalSettingSchema = new mongoose.Schema({
    siteTitle: {
        type: String,
        default: 'Appzeto | Software Company'
    },
    seoDescription: {
        type: String,
        default: 'Leading software development company.'
    },
    maintenanceMode: {
        type: Boolean,
        default: false
    },
    contactEmail: {
        type: String,
        default: 'contact@appzeto.com'
    },
    contactPhone: {
        type: String,
        default: '+91 888 234 5678'
    },
    contactAddress: {
        type: String,
        default: 'Bangalore, India'
    },
    social: {
        linkedin: { type: String, default: '' },
        instagram: { type: String, default: '' },
        twitter: { type: String, default: '' },
        github: { type: String, default: '' }
    },
    offices: [{
        title: String,
        address: String,
        time: String,
        active: { type: Boolean, default: true }
    }],
    pricing: {
        oneTimePrice: { type: Number, default: 49999 },
        monthlyEmiPrice: { type: Number, default: 4999 }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('GlobalSetting', globalSettingSchema);
