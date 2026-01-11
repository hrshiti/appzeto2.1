const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');
const connectDB = require('./src/config/db');

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

const seedAdmin = async () => {
    try {
        const email = 'newadmin@appzeto.com';
        const password = 'password123';

        console.log(`\n1. Checking for existing user: ${email}`);
        await User.deleteOne({ email });
        console.log(`2. Cleared any existing user with this email.`);

        console.log(`3. Creating new admin user...`);
        // Using create() triggers the pre-save hook for password hashing in User.js
        await User.create({
            name: 'New Super Admin',
            email: email,
            password: password,
            role: 'ADMIN'
        });

        console.log(`\n✅ SUCCESS! New Admin Created.`);
        console.log(`=========================================`);
        console.log(`Email:    ${email}`);
        console.log(`Password: ${password}`);
        console.log(`=========================================`);

        process.exit();
    } catch (err) {
        console.error("❌ Error seeding admin:", err);
        process.exit(1);
    }
};

seedAdmin();
