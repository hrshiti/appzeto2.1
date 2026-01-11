const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/:formId', formController.getFormConfig);
router.put('/:formId', protect, authorize('ADMIN'), formController.updateFormConfig);

module.exports = router;
