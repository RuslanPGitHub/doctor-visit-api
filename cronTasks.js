const cron = require('node-cron'); // Import node-cron for scheduling tasks
const fs = require('fs'); // File system module for writing to files
const path = require('path'); // Path module for handling file paths

require('./db'); // Import the database connection

// Import the Appointments model to interact with the appointments collection
const AppointmentModel = require('./models/Appointment');

// Function to get appointments based on a specific date (formatted as DDMMYYYY)
async function getAppointments(date) {
    try {
        // Query the database for appointments that match the specified date
        const results = await AppointmentModel.find({
            slot: { $regex: `^${date}` },
        });
        console.log(results);
        return results;
    } catch (error) {
        // Log any errors that occur during the database query
        console.error(error);
    }
}

// Function to log a message to a log file (notifications.log)
function logMessage(message) {
    const logFilePath = path.join(__dirname, 'notifications.log'); // Path to the log file
    const logEntry = `${new Date().toISOString()} | ${message}\n`; // Format the log entry

    // Append the message to the log file
    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) {
            console.error('Could not write in log file:', err); // Log an error if writing to the file fails
        }
    });
}

// Schedule a cron job to run every minute
cron.schedule('* * * * *', async () => {
    // Get today's date
    const today = new Date();

    // Create a new Date object for tomorrow
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Format tomorrow's date as DDMMYYYY
    const day = String(tomorrow.getDate()).padStart(2, '0');
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const year = tomorrow.getFullYear();
    const formattedDate = `${day}${month}${year}`;

    // Get all appointments scheduled for tomorrow
    const appointments = await getAppointments(formattedDate);

    // Iterate over the appointments and log a notification for each
    appointments.forEach((appointment) => {
        const message = `Hello ${appointment.patient_id}! You should visit a doctor ${appointment.doctor_id} at ${appointment.slot}!`;
        logMessage(message); // Log the message to the notifications.log file
    });
});
