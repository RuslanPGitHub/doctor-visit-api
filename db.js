const mongoose = require('mongoose');  // Import mongoose for database interaction
require('dotenv').config();  // Load environment variables from the .env file

// Async function to connect to MongoDB
async function connectToDatabase() {
    // Get MongoDB URI from environment variables or default to local MongoDB URI
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/doctorvisit';

    try {
        // Attempt to connect to MongoDB using the provided URI
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');
    } catch (err) {
        // If connection fails, log the error and exit the process
        console.error('Failed to connect to MongoDB', err);
        process.exit(1); // Exit the application with an error code (1)
    }
}

// Call the function to initiate the connection
connectToDatabase();

// Mongoose event listeners for connection events

// When mongoose successfully connects to the database
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB');
});

// If there is an error with the mongoose connection
mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

// When mongoose gets disconnected from the database
mongoose.connection.on('disconnected', () => {
    console.warn('Mongoose disconnected from DB');
});
