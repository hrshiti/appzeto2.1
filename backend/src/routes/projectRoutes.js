const express = require('express');
const {
    getProjects,
    getAdminProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject
} = require('../controllers/projectController');

const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Public Routes
router.route('/').get(getProjects);
router.route('/:id').get(getProject);

// Protected Routes (Admin)
router.use(protect);
router.use(authorize('ADMIN'));

router.get('/admin/all', getAdminProjects);
router.route('/').post(createProject);
router.route('/:id').put(updateProject).delete(deleteProject);

module.exports = router;
