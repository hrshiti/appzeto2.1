const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');
const connectDB = require('./src/config/db');

dotenv.config();
connectDB();

const createAdmin = async () => {
    try {
        const email = 'admin@appzeto.com';
        const password = 'admin123';
        const name = 'Super Admin';

        // Check if exists
        let user = await User.findOne({ email });

    
        if (user) {
            user.password = password;
            user.role = 'ADMIN';
            user.name = name;
            await user.save();
            console.log(`\nSUCCESS: Admin user updated.`);
        } else {
            user = await User.create({
                name,
                email,
                password,
                role: 'ADMIN'
            });
            console.log(`\nSUCCESS: Admin user created.`);
        }

        console.log(`-------------------------------------------`);
        console.log(`Email:    ${email}`);
        console.log(`Password: ${password}`);
        console.log(`-------------------------------------------`);

        process.exit();
    } catch (err) {
        console.error("Error creating admin:", err);
        process.exit(1);
    }
};

createAdmin();
