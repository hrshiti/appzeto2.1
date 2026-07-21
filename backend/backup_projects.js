const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const Project = require('./src/models/Project');

dotenv.config();

const backupProjects = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        const projects = await Project.find({});
        fs.writeFileSync('projects_backup_cloudinary.json', JSON.stringify(projects, null, 2));
        
        console.log(`Successfully backed up ${projects.length} projects to projects_backup_cloudinary.json`);
        process.exit(0);
    } catch (err) {
        console.error('Error backing up projects:', err);
        process.exit(1);
    }
};

backupProjects();
