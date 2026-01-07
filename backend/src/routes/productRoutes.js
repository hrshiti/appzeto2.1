const express = require('express');
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
    .get(getProducts)
    .post(protect, authorize('ADMIN'), createProduct);

router.route('/:id')
    .put(protect, authorize('ADMIN'), updateProduct)
    .delete(protect, authorize('ADMIN'), deleteProduct);

module.exports = router;
