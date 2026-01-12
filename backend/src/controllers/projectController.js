const Project = require('../models/Project');
const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');

// @desc    Get all projects (Lightweight for listing)
// @route   GET /api/projects
// @access  Public
const getProjects = asyncHandler(async (req, res) => {
    // Select only necessary fields for listing to optimize performance
    const projects = await Project.find()
        .select('title slug thumbnail category shortDescription techTags isFeatured orderIndex')
        .sort({ orderIndex: 1, createdAt: -1 });

    res.status(200).json({
        success: true,
        count: projects.length,
        data: projects
    });
});

// @desc    Get single project by slug or ID
// @route   GET /api/projects/:slug
// @access  Public
const getProjectBySlug = asyncHandler(async (req, res) => {
    const { slug } = req.params;
    let project;

    // Check if the parameter resembles a valid MongoDB ObjectId (24 hex characters)
    if (slug.match(/^[0-9a-fA-F]{24}$/)) {
        project = await Project.findById(slug);
    }

    // If no project found by ID (or not a valid ID), try finding by slug
    if (!project) {
        project = await Project.findOne({ slug });
    }

    if (!project) {
        res.status(404);
        throw new Error('Project not found');
    }

    res.status(200).json({
        success: true,
        data: project
    });
});

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private/Admin
const createProject = asyncHandler(async (req, res) => {
    const { title, shortDescription, category } = req.body;

    // Basic Validation
    if (!title || !shortDescription || !category) {
        res.status(400);
        throw new Error('Please provide title, category, and short description');
    }

    // Check for duplicate title
    const projectExists = await Project.findOne({ title });
    if (projectExists) {
        res.status(400);
        throw new Error('Project already exists with this title');
    }

    // If file uploads are handled, req.files will contain them. 
    // Logic to map uploaded files to schema fields would go here.
    // For now, we assume URLs are passed in body or handled by middleware prior to this.

    // Create Project
    const project = await Project.create(req.body);

    res.status(201).json({
        success: true,
        data: project
    });
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private/Admin
const updateProject = asyncHandler(async (req, res) => {
    let project = await Project.findById(req.params.id);

    if (!project) {
        res.status(404);
        throw new Error('Project not found');
    }

    // slug update handling logic if title changes is handled by frontend sending new title,
    // but mongoose pre-save only runs on .save(), so we should use findByIdAndUpdate carefully or save manually.
    // Ideally for updates, we stick to findByIdAndUpdate for partials, but slugify might need manual trigger.

    project = await Project.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: project
    });
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
const deleteProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (!project) {
        res.status(404);
        throw new Error('Project not found');
    }

    await project.deleteOne();

    res.status(200).json({
        success: true,
        data: {}
    });
});

module.exports = {
    getProjects,
    getProjectBySlug,
    createProject,
    updateProject,
    deleteProject
};
