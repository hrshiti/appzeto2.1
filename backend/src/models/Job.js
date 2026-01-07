const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, enum: ['Full Time', 'Part Time', 'Contract', 'Internship'], required: true },
    department: String,
    location: { type: String, default: 'Remote' },
    description: String,
    requirements: String,
    salary: String,
    duration: String,
    active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
