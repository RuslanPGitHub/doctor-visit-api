const mongoose = require('mongoose');  // Import mongoose for schema and model creation

// Define the schema for patients
const PatientSchema = mongoose.Schema({
    id: {
        type: Number,  // id is a required field of type Number
        required: true,
    },
    name: {
        type: String,  // name is a required field of type String
        required: true,
    },
    phone: {
        type: String,  // phone is a required field of type String
        required: true,
    },
});

// Create the model for patients using the defined schema
const Patient = mongoose.model('Patient', PatientSchema);

// Export the model to use it in other parts of the application
module.exports = Patient;
