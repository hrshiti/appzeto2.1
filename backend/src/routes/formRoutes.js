const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/:formId', formController.getFormConfig);
router.put('/:formId', protect, admin, formController.updateFormConfig);

module.exports = router;
