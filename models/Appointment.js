const mongoose = require('mongoose');  // Import mongoose for schema and model creation

// Define the schema for appointments
const AppointmentSchema = mongoose.Schema({
    doctor_id: {
        type: Number,  // doctor_id is a required field of type Number
        required: true,
    },
    patient_id: {
        type: String,  // patient_id is a required field of type String
        required: true,
    },
    slot: {
        type: String,  // slot is a required field of type String
        required: true,
        validate: {
            // Validate that the slot follows the pattern DDMMYYYY_HH
            validator: function (v) {
                return /^\d{8}_\d{2}$/.test(v);  // Regular expression to match the format
            },
            message: (props) => `${props.value} is not a valid slot format! Format should be DDMMYYYY_HH`,
            // If the validation fails, this message will be returned
        },
    },
});

// Create the model for appointments using the defined schema
const Appointments = mongoose.model('Appointments', AppointmentSchema);

// Export the model to use it in other parts of the application
module.exports = Appointments;
