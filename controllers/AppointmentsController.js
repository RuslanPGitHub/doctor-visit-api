const AppointmentsModel = require('../models/Appointment'); // Import the Appointments model to interact with the database

// The Appointments controller function for handling appointment creation
const Appointments = async (ctx) => {
    if (!ctx.request.body) {
        ctx.status = 400; // HTTP status 400 indicates a bad request
        ctx.body = { error: 'Your request is empty' }; // Return error message
        return; // Stop further execution if validation fails
    }

    // Extract patient_id, doctor_id, and slot from the request body
    const { patient_id, doctor_id, slot } = ctx.request.body;

    // Validate patient_id: it must be provided and be a valid number
    if (!patient_id || isNaN(patient_id)) {
        ctx.status = 400; // HTTP status 400 indicates a bad request
        ctx.body = { error: 'patient_id is incorrect or empty' }; // Return error message
        return; // Stop further execution if validation fails
    }

    // Validate doctor_id: it must be provided and be a valid number
    if (!doctor_id || isNaN(doctor_id)) {
        ctx.status = 400; // HTTP status 400
        ctx.body = { error: 'doctor_id is incorrect or empty' };
        return;
    }

    // Validate slot format: it must match the regex pattern for DDMMYYYY_HH
    const dateRegex = /^\d{2}\d{2}\d{4}_\d{2}$/;
    if (!slot || !dateRegex.test(slot)) {
        ctx.status = 400; // HTTP status 400
        ctx.body = {
            error: 'date_time is incorrect. Expected format: DDMMYYYY_HH',
        };
        return;
    }

    // Extract the hour part of the slot and check if it's within the allowed range (8 to 15)
    const hours = slot.split('_');
    if (hours[1] < 8 || hours[1] > 15) {
        ctx.status = 400; // HTTP status 400
        ctx.body = { error: 'Appointment can be from 8 to 15' }; // Valid hours are between 8 and 15
        return;
    }

    try {
        // Check if the slot is already booked by another appointment with the same doctor
        const existingAppointment = await AppointmentsModel.findOne({
            slot,
            doctor_id,
        });

        if (existingAppointment) {
            ctx.status = 409; // HTTP status 409 indicates a conflict (slot is already booked)
            ctx.body = { error: 'The selected slot is already booked' };
            return;
        }

        // Create a new appointment document
        const newAppointment = new AppointmentsModel({
            doctor_id,
            patient_id: patient_id,
            slot,
        });

        // Save the new appointment to the database
        await newAppointment.save();

        // Return a success message with the newly created appointment data
        ctx.status = 201; // HTTP status 201 indicates resource creation
        ctx.body = {
            message: 'Appointment created successfully',
            data: newAppointment,
        };
    } catch (error) {
        // Handle any unexpected errors
        console.error(error);
        ctx.status = 500; // HTTP status 500 indicates a server error
        ctx.body = { error: 'Internal server error' };
    }
};

module.exports = Appointments; // Export the Appointments function for use in the routing layer
