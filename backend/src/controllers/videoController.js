const Video = require('../models/Video');

exports.getVideos = async (req, res) => {
    try {
        const videos = await Video.find().sort('-createdAt');
        res.status(200).json({ success: true, count: videos.length, data: videos });
    } catch (err) { res.status(500).json({ success: false, error: err.message }); }
};

exports.createVideo = async (req, res) => {
    try {
        const video = await Video.create(req.body);
        res.status(201).json({ success: true, data: video });
    } catch (err) { res.status(400).json({ success: false, error: err.message }); }
};

exports.updateVideo = async (req, res) => {
    try {
        const video = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!video) return res.status(404).json({ success: false, error: 'Not found' });
        res.status(200).json({ success: true, data: video });
    } catch (err) { res.status(400).json({ success: false, error: err.message }); }
};

exports.deleteVideo = async (req, res) => {
    try {
        const video = await Video.findByIdAndDelete(req.params.id); // or findById then remove
        if (!video) return res.status(404).json({ success: false, error: 'Not found' });
        res.status(200).json({ success: true, data: {} });
    } catch (err) { res.status(400).json({ success: false, error: err.message }); }
};
