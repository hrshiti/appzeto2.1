const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort('-createdAt');
        res.status(200).json({ success: true, count: products.length, data: products });
    } catch (err) { res.status(500).json({ success: false, error: err.message }); }
};

exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({ success: true, data: product });
    } catch (err) { res.status(400).json({ success: false, error: err.message }); }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) return res.status(404).json({ success: false, error: 'Not found' });
        res.status(200).json({ success: true, data: product });
    } catch (err) { res.status(400).json({ success: false, error: err.message }); }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ success: false, error: 'Not found' });
        res.status(200).json({ success: true, data: {} });
    } catch (err) { res.status(400).json({ success: false, error: err.message }); }
};
