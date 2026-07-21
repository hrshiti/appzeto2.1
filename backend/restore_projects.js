const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const Project = require('./src/models/Project');

dotenv.config();

const restoreProjects = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        // Read the backup file
        const backupData = fs.readFileSync('projects_backup_cloudinary.json', 'utf8');
        const projects = JSON.parse(backupData);

        // Delete current projects and insert backup
        await Project.deleteMany({});
        await Project.insertMany(projects);

        console.log(`Successfully restored ${projects.length} projects from backup!`);
        process.exit(0);
    } catch (err) {
        console.error('Error restoring projects:', err);
        process.exit(1);
    }
};

restoreProjects();
