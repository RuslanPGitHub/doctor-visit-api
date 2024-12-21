// prefill.js
const mongoose = require('mongoose');
const Doctor = require('./models/Doctor');
const Patient = require('./models/Patient');

// Function to connect to MongoDB
async function connectToDatabase() {
    try {
        // Connect to the MongoDB database 'doctorvisit'
        await mongoose.connect('mongodb://localhost:27017/doctorvisit');
        console.log('Connected to MongoDB');

        // Once connected, pre-fill the database with test data
        await prefillDatabase();
    } catch (err) {
        // Log an error if the connection fails
        console.error('Failed to connect to MongoDB', err);
    } finally {
        // Close the connection after the operation is complete
        mongoose.connection.close();
    }
}

// Function to pre-fill the database with test data
async function prefillDatabase() {
    try {
        // Delete any existing data in the Patient and Doctor collections
        await Patient.deleteMany({});
        await Doctor.deleteMany({});

        // Define test data for patients
        const users = [
            { id: 101, phone: '1234567890', name: 'John Doe' },
            { id: 102, phone: '0987654321', name: 'Jane Smith' },
            { id: 103, phone: '5555555555', name: 'Alice Johnson' },
        ];

        // Define test data for doctors
        const doctors = [
            { id: 301, name: 'Dr. House', spec: 'Diagnostics' },
            { id: 302, name: 'Dr. Watson', spec: 'General Practitioner' },
            { id: 303, name: 'Dr. Strange', spec: 'Surgeon' },
        ];

        // Insert test patient data into the database
        await Patient.insertMany(users);

        // Insert test doctor data into the database
        await Doctor.insertMany(doctors);

        console.log('Database has been prefilled with test data');
    } catch (error) {
        // Log an error if something goes wrong during the database pre-filling
        console.error('Error pre-filling the database:', error);
    } finally {
        // Close the connection after the operation is complete
        mongoose.connection.close();
    }
}

// Execute the function to connect to the database and pre-fill it
connectToDatabase();
