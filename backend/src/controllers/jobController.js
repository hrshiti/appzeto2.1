const Job = require('../models/Job');

exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ type: { $ne: 'Internship' } }).sort('-createdAt'); // Exclude internships if separating, or filter by query
        // Actually, let's allow filtering via query
        const filter = {};
        if (req.query.type) filter.type = req.query.type;

        const jobsData = await Job.find(filter).sort('-createdAt');
        res.status(200).json({ success: true, count: jobsData.length, data: jobsData });
    } catch (err) { res.status(500).json({ success: false, error: err.message }); }
};

// Use this for both Job and Internship management
exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().sort('-createdAt');
        res.status(200).json({ success: true, count: jobs.length, data: jobs });
    } catch (err) { res.status(500).json({ success: false, error: err.message }); }
};

exports.createJob = async (req, res) => {
    try {
        const job = await Job.create(req.body);
        res.status(201).json({ success: true, data: job });
    } catch (err) { res.status(400).json({ success: false, error: err.message }); }
};

exports.updateJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!job) return res.status(404).json({ success: false, error: 'Not found' });
        res.status(200).json({ success: true, data: job });
    } catch (err) { res.status(400).json({ success: false, error: err.message }); }
};

exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) return res.status(404).json({ success: false, error: 'Not found' });
        res.status(200).json({ success: true, data: {} });
    } catch (err) { res.status(400).json({ success: false, error: err.message }); }
};
