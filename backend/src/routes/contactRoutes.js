const express = require('express');
const { submitMessage, submitLead, getMessages, getLeads, deleteMessage, deleteLead, updateLead } = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/message', submitMessage);
router.post('/lead', submitLead);

router.get('/messages', protect, authorize('ADMIN'), getMessages);
router.delete('/messages/:id', protect, authorize('ADMIN'), deleteMessage);

router.get('/leads', protect, authorize('ADMIN'), getLeads);
router.put('/leads/:id', protect, authorize('ADMIN'), updateLead);
router.delete('/leads/:id', protect, authorize('ADMIN'), deleteLead);

module.exports = router;
