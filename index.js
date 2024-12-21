require('dotenv').config();  // Load environment variables from .env file

const Koa = require('koa');  // Koa framework for building the server
const koaBody = require('koa-body').default;  // Middleware for parsing request bodies
const Router = require('koa-router');  // Router for handling API routes
const appointmentsRoutes = require('./routes/appointments');  // Import appointments routes

require('./db');  // Connect to the database
require('./cronTasks');  // Import cron jobs/tasks for scheduling

const app = new Koa();  // Create a new Koa application instance
const mainRouter = new Router();  // Create a new router instance for handling main routes

// Use koaBody middleware for parsing incoming request bodies
app.use(koaBody());

// Use the imported appointments routes and allow methods for appointments API
app.use(appointmentsRoutes.routes());
app.use(appointmentsRoutes.allowedMethods());

// Define a simple route for the root of the application
mainRouter.get('/', (ctx) => {
    ctx.body = 'Welcome to the Doctor Visit API!';  // Response for the root URL
});

// Apply the main router routes and allowed methods to the app
app.use(mainRouter.routes());
app.use(mainRouter.allowedMethods());

// Define the port to listen on, using environment variable or defaulting to 8080
const port = process.env.PORT || 8080;

// Start the server and log a message when it’s running
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
