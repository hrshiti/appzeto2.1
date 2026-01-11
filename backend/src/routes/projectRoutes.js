const express = require('express');
const router = express.Router();
const {
    getProjects,
    getProjectBySlug,
    createProject,
    updateProject,
    deleteProject
} = require('../controllers/projectController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public Routes
router.get('/', getProjects);
router.get('/:slug', getProjectBySlug);

// Admin Routes (Protected)
router.post('/', protect, authorize('ADMIN'), createProject);
router.put('/:id', protect, authorize('ADMIN'), updateProject);
router.delete('/:id', protect, authorize('ADMIN'), deleteProject);

module.exports = router;
