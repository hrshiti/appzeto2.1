const mongoose = require('mongoose');
const Service = require('../models/Service');

// @desc    Get all services
// @route   GET /api/services
// @access  Public
exports.getServices = async (req, res, next) => {
    try {
        const services = await Service.find({ active: true }).sort('order');
        res.status(200).json({ success: true, count: services.length, data: services });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Get all services (Admin)
// @route   GET /api/services/admin
// @access  Private (Admin)
exports.getAdminServices = async (req, res, next) => {
    try {
        const services = await Service.find().sort('createdAt');
        res.status(200).json({ success: true, count: services.length, data: services });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Get single service
// @route   GET /api/services/:id (or :slug)
// @access  Public
exports.getService = async (req, res, next) => {
    try {
        // Allow query by ID or Slug
        const query = mongoose.isValidObjectId(req.params.id) ? { _id: req.params.id } : { slug: req.params.id };
        const service = await Service.findOne(query);

        if (!service) {
            return res.status(404).json({ success: false, error: 'Service not found' });
        }

        res.status(200).json({ success: true, data: service });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Create new service
// @route   POST /api/services
// @access  Private (Admin)
exports.createService = async (req, res, next) => {
    try {
        const service = await Service.create(req.body);
        res.status(201).json({ success: true, data: service });
    } catch (err) {
        let error = err.message;
        // Handle duplicate key error
        if (err.code === 11000) {
            error = 'A service with this title or slug already exists.';
        }
        res.status(400).json({ success: false, error: error });
    }
};

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private (Admin)
exports.updateService = async (req, res, next) => {
    try {
        let service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({ success: false, error: 'Service not found' });
        }

        service = await Service.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: service });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private (Admin)
exports.deleteService = async (req, res, next) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({ success: false, error: 'Service not found' });
        }

        await service.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
