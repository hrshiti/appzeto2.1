const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment, getAllPayments } = require('../controllers/paymentController');

// Define routes
router.post('/create-order', createOrder);
router.post('/verify', verifyPayment);
router.get('/', getAllPayments); // Protect this with auth middleware if needed

module.exports = router;
