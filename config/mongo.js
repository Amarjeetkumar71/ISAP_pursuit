const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost:27017/pursuit'; // Replace with your actual MongoDB connection string

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process in case of connection failure
    }
};

module.exports = connectDB;
