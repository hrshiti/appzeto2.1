const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        console.log('\n💡 Tip: Your IP address might not be whitelisted on MongoDB Atlas.');
        console.log('To fix this:');
        console.log('1. Go to https://cloud.mongodb.com/');
        console.log('2. Network Access -> Add IP Address');
        console.log('3. Click "Allow Access From Anywhere" or "Add Current IP Address"');
        process.exit(1);
    }
};

module.exports = connectDB;
