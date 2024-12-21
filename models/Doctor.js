const mongoose = require('mongoose');  // Import mongoose for schema and model creation

// Define the schema for doctors
const DoctorSchema = mongoose.Schema({
    id: {
        type: Number,  // id is a required field of type Number
        required: true,
    },
    name: {
        type: String,  // name is a required field of type String
        required: true,
    },
    spec: {
        type: String,  // spec (specialization) is a required field of type String
        required: true,
    },
});

// Create the model for doctors using the defined schema
const Doctor = mongoose.model('Doctor', DoctorSchema);

// Export the model to use it in other parts of the application
module.exports = Doctor;
