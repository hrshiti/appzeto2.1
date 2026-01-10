const Message = require('../models/Message');
const Lead = require('../models/Lead');
const Application = require('../models/Application');
const PartnerInquiry = require('../models/PartnerInquiry');

// Public
exports.submitMessage = async (req, res) => {
    try {
        console.log('Received payload:', req.body);
        await Message.create(req.body);
        res.status(201).json({ success: true, message: 'Message sent' });
    } catch (e) {
        console.error('Submit Message Error:', e);
        res.status(400).json({ success: false, error: e.message });
    }
};

exports.submitLead = async (req, res) => {
    try {
        await Lead.create(req.body);
        res.status(201).json({ success: true, message: 'Lead submitted' });
    } catch (e) { res.status(400).json({ success: false, error: e.message }); }
};

// Admin
exports.getMessages = async (req, res) => {
    try {
        const data = await Message.find().sort('-createdAt');
        res.status(200).json({ success: true, data });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

exports.getLeads = async (req, res) => {
    try {
        const data = await Lead.find().sort('-createdAt');
        res.status(200).json({ success: true, data });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

exports.deleteMessage = async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, data: {} });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

exports.deleteLead = async (req, res) => {
    try {
        await Lead.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, data: {} });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

exports.updateLead = async (req, res) => {
    try {
        const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json({ success: true, data: lead });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

// Careers (Applications)
exports.submitApplication = async (req, res) => {
    try {
        await Application.create(req.body);
        res.status(201).json({ success: true, message: 'Application submitted' });
    } catch (e) { res.status(400).json({ success: false, error: e.message }); }
};

exports.getApplications = async (req, res) => {
    try {
        const data = await Application.find().sort('-createdAt');
        res.status(200).json({ success: true, data });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

exports.deleteApplication = async (req, res) => {
    try {
        await Application.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, data: {} });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

// Partners
exports.submitPartnerInquiry = async (req, res) => {
    try {
        await PartnerInquiry.create(req.body);
        res.status(201).json({ success: true, message: 'Partner inquiry submitted' });
    } catch (e) { res.status(400).json({ success: false, error: e.message }); }
};

exports.getPartnerInquiries = async (req, res) => {
    try {
        const data = await PartnerInquiry.find().sort('-createdAt');
        res.status(200).json({ success: true, data });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

exports.deletePartnerInquiry = async (req, res) => {
    try {
        await PartnerInquiry.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, data: {} });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};
