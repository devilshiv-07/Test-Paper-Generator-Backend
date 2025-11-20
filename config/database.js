const mongoose = require('mongoose');
const config = require("./config");

const connectDB = async () => {
    try {
        if (!config.databaseURI) {
            console.error('❌ Database connection failed: MONGODB_URI is not defined');
            process.exit(1);
        }

        const conn = await mongoose.connect(config.databaseURI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`📊 Database: ${conn.connection.name}`);
        console.log(`🌍 Environment: ${config.nodeEnv}`);
    } catch (error) {
        console.error(`❌ Database connection failed: ${error.message}`);
        if (config.nodeEnv === 'development') {
            console.error('💡 Make sure MongoDB is running and MONGODB_URI is correct in .env.development');
        }
        process.exit(1);
    }
}

module.exports = connectDB;