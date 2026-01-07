const express = require('express');
const { getJobs, getAllJobs, createJob, updateJob, deleteJob } = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
    .get(getJobs)
    .post(protect, authorize('ADMIN', 'HR'), createJob); // HR can access

router.get('/all', getAllJobs); // Admin/list all

router.route('/:id')
    .put(protect, authorize('ADMIN', 'HR'), updateJob)
    .delete(protect, authorize('ADMIN', 'HR'), deleteJob);

module.exports = router;
