const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://amar1947:0BWx0qadp7rPGq3K@cluster0.1ffg0zi.mongodb.net/pursuit';
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
