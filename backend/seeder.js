const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');
const connectDB = require('./src/config/db');

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

// Build Admin User
const users = [
    {
        name: 'Admin User',
        email: 'admin@appzeto.com',
        phone: '9876543210',
        password: 'adminpassword',
        role: 'ADMIN'
    },
    {
        name: 'HR Manager',
        email: 'hr@appzeto.com',
        phone: '9876543211',
        password: 'hrpassword',
        role: 'HR'
    }
];

const importData = async () => {
    try {
        await User.deleteMany(); // Clear existing users
        await User.create(users);
        console.log('Data Imported...');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

const deleteData = async () => {
    try {
        await User.deleteMany();
        console.log('Data Destroyed...');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
} else {
    console.log('Please add -i to import or -d to delete');
    process.exit();
}
