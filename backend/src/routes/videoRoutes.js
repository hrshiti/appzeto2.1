const express = require('express');
const { getVideos, createVideo, updateVideo, deleteVideo } = require('../controllers/videoController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
    .get(getVideos)
    .post(protect, authorize('ADMIN'), createVideo);

router.route('/:id')
    .put(protect, authorize('ADMIN'), updateVideo)
    .delete(protect, authorize('ADMIN'), deleteVideo);

module.exports = router;
