const mongoose = require('mongoose');

const formConfigSchema = new mongoose.Schema({
    formId: {
        type: String,
        required: true,
        unique: true, // e.g., 'contact', 'career', 'sales'
    },
    title: { type: String },
    submitButtonText: { type: String, default: 'Submit' },
    fields: [
        {
            id: { type: Number }, // To track uniqueness in UI
            label: { type: String, required: true },
            type: { type: String, required: true, enum: ['text', 'email', 'phone', 'textarea', 'select', 'file'] },
            placeholder: { type: String },
            required: { type: Boolean, default: false },
            options: [{ type: String }], // For select dropdowns
        }
    ],
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('FormConfig', formConfigSchema);
