const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./src/models/Project');

dotenv.config();

const updateProjects = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        // 1. Update AppzetoFood
        await Project.findOneAndUpdate(
            { title: 'AppzetoFood' },
            {
                $set: {
                    thumbnail: '/assets/projects/appzeto-food-1.jpg',
                    'hero.coverImage': '/assets/projects/appzeto-food-hero.jpg',
                    'overview.mediaUrl': '/assets/projects/appzeto-food-2.jpg',
                    'overview.mediaType': 'image'
                }
            }
        );

        // 2. Update AppzetoTaxi
        await Project.findOneAndUpdate(
            { title: 'AppzetoTaxi' },
            {
                $set: {
                    thumbnail: '/assets/projects/taxi app.webp',
                    'hero.coverImage': '/assets/projects/taxi app.webp',
                    'overview.mediaUrl': '/assets/projects/taxi user.webp',
                    'overview.mediaType': 'image'
                }
            }
        );

        // 3. Update Inplay
        await Project.findOneAndUpdate(
            { title: 'Inplay' },
            {
                $set: {
                    thumbnail: '/assets/projects/ott platform.webp',
                    'hero.coverImage': '/assets/projects/ott platform2.png',
                    'overview.mediaUrl': '/assets/projects/ott flatform3.webp',
                    'overview.mediaType': 'image',
                    'mediaShowcase.mediaUrl': '/assets/projects/ott platform2.png',
                    'mediaShowcase.mediaType': 'image'
                }
            }
        );

        console.log('Successfully updated projects to use local images!');
        process.exit(0);
    } catch (err) {
        console.error('Error updating projects:', err);
        process.exit(1);
    }
};

updateProjects();
