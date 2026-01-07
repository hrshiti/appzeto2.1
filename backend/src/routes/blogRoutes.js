const express = require('express');
const { getBlogs, getAdminBlogs, getBlog, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(getBlogs);
router.route('/:id').get(getBlog);

router.use(protect, authorize('ADMIN'));
router.get('/admin/all', getAdminBlogs);
router.route('/').post(createBlog);
router.route('/:id').put(updateBlog).delete(deleteBlog);

module.exports = router;
