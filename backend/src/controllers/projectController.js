const Project = require('../models/Project');
const mongoose = require('mongoose');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
exports.getProjects = async (req, res, next) => {
    try {
        const projects = await Project.find({ active: true }).sort('-createdAt');
        res.status(200).json({ success: true, count: projects.length, data: projects });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Get all projects (Admin)
// @route   GET /api/projects/admin
// @access  Private (Admin)
exports.getAdminProjects = async (req, res, next) => {
    try {
        const projects = await Project.find().sort('-createdAt');
        res.status(200).json({ success: true, count: projects.length, data: projects });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
exports.getProject = async (req, res, next) => {
    try {
        const query = mongoose.isValidObjectId(req.params.id) ? { _id: req.params.id } : { slug: req.params.id };
        const project = await Project.findOne(query);

        if (!project) {
            return res.status(404).json({ success: false, error: 'Project not found' });
        }

        res.status(200).json({ success: true, data: project });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private (Admin)
exports.createProject = async (req, res, next) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json({ success: true, data: project });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Admin)
exports.updateProject = async (req, res, next) => {
    try {
        let project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ success: false, error: 'Project not found' });
        }

        project = await Project.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: project });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
exports.deleteProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ success: false, error: 'Project not found' });
        }

        await project.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
