const express = require('express');
const router = express.Router();
const {
    getProjects,
    getProjectBySlug,
    createProject,
    updateProject,
    deleteProject
} = require('../controllers/projectController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public Routes
router.get('/', getProjects);
router.get('/:slug', getProjectBySlug);

// Admin Routes (Protected)
router.post('/', protect, admin, createProject);
router.put('/:id', protect, admin, updateProject);
router.delete('/:id', protect, admin, deleteProject);

module.exports = router;
