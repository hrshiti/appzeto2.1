const express = require('express');
const {
    submitMessage, submitLead, getMessages, getLeads, deleteMessage, deleteLead, updateLead,
    submitApplication, getApplications, deleteApplication,
    submitPartnerInquiry, getPartnerInquiries, deletePartnerInquiry
} = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/message', submitMessage);
router.post('/lead', submitLead);
router.post('/application', submitApplication);
router.post('/partner', submitPartnerInquiry);

router.get('/messages', protect, authorize('ADMIN'), getMessages);
router.delete('/messages/:id', protect, authorize('ADMIN'), deleteMessage);

router.get('/leads', protect, authorize('ADMIN'), getLeads);
router.put('/leads/:id', protect, authorize('ADMIN'), updateLead);
router.delete('/leads/:id', protect, authorize('ADMIN'), deleteLead);

router.get('/applications', protect, authorize('ADMIN'), getApplications);
router.delete('/applications/:id', protect, authorize('ADMIN'), deleteApplication);

router.get('/partners', protect, authorize('ADMIN'), getPartnerInquiries);
router.delete('/partners/:id', protect, authorize('ADMIN'), deletePartnerInquiry);

module.exports = router;
