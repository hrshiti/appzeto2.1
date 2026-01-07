const express = require('express');
const {
    getServices,
    getAdminServices,
    getService,
    createService,
    updateService,
    deleteService
} = require('../controllers/serviceController');

const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Public Routes
router.route('/').get(getServices);
router.route('/:id').get(getService);

// Protected Routes (Admin)
router.use(protect);
router.use(authorize('ADMIN'));

router.get('/admin/all', getAdminServices);
router.route('/').post(createService);
router.route('/:id').put(updateService).delete(deleteService);

module.exports = router;
