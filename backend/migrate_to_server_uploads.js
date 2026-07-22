const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const Project = require('./src/models/Project');

dotenv.config();

// Copy directory recursively
function copyDirectorySync(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyDirectorySync(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

const runMigration = async () => {
    try {
        console.log('1. Copying project images from frontend assets to backend public/uploads/projects...');
        const frontendProjectsDir = path.join(__dirname, '../frontend_1/src/assets/projects');
        const backendUploadsProjectsDir = path.join(__dirname, 'public/uploads/projects');

        if (fs.existsSync(frontendProjectsDir)) {
            copyDirectorySync(frontendProjectsDir, backendUploadsProjectsDir);
            console.log('Successfully copied project images to server uploads folder!');
        } else {
            console.log('Warning: Frontend assets directory not found at', frontendProjectsDir);
        }

        console.log('2. Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        // Explicit updates for the 3 core projects to point to server /uploads/projects/
        await Project.findOneAndUpdate(
            { title: 'AppzetoFood' },
            {
                $set: {
                    thumbnail: '/uploads/projects/appzeto-food-1.jpg',
                    'hero.coverImage': '/uploads/projects/appzeto-food-hero.jpg',
                    'overview.mediaUrl': '/uploads/projects/appzeto-food-2.jpg',
                    'overview.mediaType': 'image'
                }
            }
        );

        await Project.findOneAndUpdate(
            { title: 'AppzetoTaxi' },
            {
                $set: {
                    thumbnail: '/uploads/projects/taxi app.webp',
                    'hero.coverImage': '/uploads/projects/taxi app.webp',
                    'overview.mediaUrl': '/uploads/projects/taxi user.webp',
                    'overview.mediaType': 'image'
                }
            }
        );

        await Project.findOneAndUpdate(
            { title: 'Inplay' },
            {
                $set: {
                    thumbnail: '/uploads/projects/ott platform.webp',
                    'hero.coverImage': '/uploads/projects/ott platform2.png',
                    'overview.mediaUrl': '/uploads/projects/ott flatform3.webp',
                    'overview.mediaType': 'image',
                    'mediaShowcase.mediaUrl': '/uploads/projects/ott platform2.png',
                    'mediaShowcase.mediaType': 'image'
                }
            }
        );

        // General check across all projects: replace any remaining /assets/projects/ with /uploads/projects/
        const allProjects = await Project.find({});
        for (const p of allProjects) {
            let modified = false;
            const replacePrefix = (val) => {
                if (typeof val === 'string' && val.startsWith('/assets/projects/')) {
                    modified = true;
                    return val.replace('/assets/projects/', '/uploads/projects/');
                }
                return val;
            };

            p.thumbnail = replacePrefix(p.thumbnail);
            if (p.hero && p.hero.coverImage) p.hero.coverImage = replacePrefix(p.hero.coverImage);
            if (p.overview && p.overview.mediaUrl) p.overview.mediaUrl = replacePrefix(p.overview.mediaUrl);
            if (p.mediaShowcase && p.mediaShowcase.mediaUrl) p.mediaShowcase.mediaUrl = replacePrefix(p.mediaShowcase.mediaUrl);
            if (Array.isArray(p.images)) {
                p.images = p.images.map(img => replacePrefix(img));
            }

            if (modified) {
                await p.save();
                console.log(`Updated paths for project: ${p.title}`);
            }
        }

        console.log('Successfully updated MongoDB records to use server /uploads/projects paths!');
        process.exit(0);
    } catch (err) {
        console.error('Error during migration:', err);
        process.exit(1);
    }
};

runMigration();
