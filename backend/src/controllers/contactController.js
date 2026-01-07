const Message = require('../models/Message');
const Lead = require('../models/Lead');

// Public
exports.submitMessage = async (req, res) => {
    try {
        await Message.create(req.body);
        res.status(201).json({ success: true, message: 'Message sent' });
    } catch (e) { res.status(400).json({ success: false, error: e.message }); }
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
