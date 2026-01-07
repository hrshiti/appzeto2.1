const Blog = require('../models/Blog');

exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ active: true }).sort('-createdAt');
        res.status(200).json({ success: true, count: blogs.length, data: blogs });
    } catch (err) { res.status(500).json({ success: false, error: err.message }); }
};

exports.getAdminBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort('-createdAt');
        res.status(200).json({ success: true, count: blogs.length, data: blogs });
    } catch (err) { res.status(500).json({ success: false, error: err.message }); }
};

exports.getBlog = async (req, res) => {
    try {
        const query = req.params.id.match(/^[0-9a-fA-F]{24}$/) ? { _id: req.params.id } : { slug: req.params.id };
        const blog = await Blog.findOne(query);
        if (!blog) return res.status(404).json({ success: false, error: 'Blog not found' });
        res.status(200).json({ success: true, data: blog });
    } catch (err) { res.status(500).json({ success: false, error: err.message }); }
};

exports.createBlog = async (req, res) => {
    try {
        const blog = await Blog.create(req.body);
        res.status(201).json({ success: true, data: blog });
    } catch (err) { res.status(400).json({ success: false, error: err.message }); }
};

exports.updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!blog) return res.status(404).json({ success: false, error: 'Blog not found' });
        res.status(200).json({ success: true, data: blog });
    } catch (err) { res.status(400).json({ success: false, error: err.message }); }
};

exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ success: false, error: 'Blog not found' });
        await blog.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (err) { res.status(400).json({ success: false, error: err.message }); }
};
