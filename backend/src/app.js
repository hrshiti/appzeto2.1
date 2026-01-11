const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');

// Initialize app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors()); // Enable CORS
// app.use(helmet()); 
app.use(helmet({ crossOriginResourcePolicy: false })); // Allow cross-origin images

// Serve static files from public/uploads
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // Logging
}

// Routes Base
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Appzeto API v2.1' });
});

// Import Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const projectRoutes = require('./routes/projectRoutes');
const settingRoutes = require('./routes/settingRoutes');
const blogRoutes = require('./routes/blogRoutes');
const videoRoutes = require('./routes/videoRoutes');
const jobRoutes = require('./routes/jobRoutes');
const contactRoutes = require('./routes/contactRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const formRoutes = require('./routes/formRoutes');


// Mount Routes
app.use('/api/auth', authRoutes);

app.use('/api/products', productRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/upload', uploadRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
});

module.exports = app;
