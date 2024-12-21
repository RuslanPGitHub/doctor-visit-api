const Router = require('koa-router');  // Import the koa-router module for handling routes
const router = new Router();  // Create a new instance of the router
const Appointments = require('../controllers/AppointmentsController');  // Import the appointments controller

// Define a POST route for creating new appointments
router.post('/appointments', Appointments);

// Export the router so it can be used in other parts of the application
module.exports = router;
