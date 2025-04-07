/* ***********************
 * Requires Statements
 *************************/
// Load environment variables from .env file
require('dotenv').config();
// Import the Express framework
const express = require("express");
// Import path module for working with file and directory paths
const path = require("path");
// Import express-ejs-layouts for layout support
const expressLayouts = require("express-ejs-layouts");
// Create an Express application instance
const app = express();
// Import utility functions (assuming you have utilities/index.js)
const utilities = require("./utilities"); // Make sure this path is correct
// Import route files
const baseController = require("./controllers/baseController"); // Assuming you might use this later
const inventoryRoute = require("./routes/inventoryRoute");// Import inventory routes
const errorRoute = require("./routes/errorroute"); // Import the new error trigger route

/* ***********************
 * View Engine and Templates
 *************************/
// Set EJS as the view engine
app.set("view engine", "ejs");
// Use express-ejs-layouts middleware
app.use(expressLayouts);
// Set the default layout file
app.set("layout", "./layout/layout"); // assumes views/layouts/layout.ejs
// Set the directory for view templates
app.set("views", path.join(__dirname, "views"));

/* ***********************
 * Middleware
 *************************/
// Serve static files (CSS, images, client-side JS) from the 'public' directory
// This needs to come BEFORE routes that might use static files
app.use(express.static(path.join(__dirname, "public")));

/* ***********************
 * Routes
 *************************/
// Index route - using buildHome method from baseController
// The assignment implies dynamic navigation, likely handled by utilities.buildNavigation
// which might be called within controllers or passed directly here.
// We'll pass the utilities.buildNavigation result to the view.
app.get("/", utilities.handleErrors(baseController.buildHome));

// Inventory routes
app.use("/inv", utilities.handleErrors(inventoryRoute));

// Intentional Error Trigger Route
app.use("/error", utilities.handleErrors(errorRoute));

// File Not Found Route - MUST be last route before error handler
// This middleware catches any requests that didn't match previous routes
app.use(async (req, res, next) => {
  // Create a new Error object for the 404
  const err = new Error("File Not Found");
  err.status = 404;
  // Pass the error to the next middleware (the error handler)
  next(err);
});

/* ***********************
 * Express Error Handler
 *************************/
/* Place after all routes and other middleware */
// This middleware takes 4 arguments, indicating it's an error handler
app.use(async (err, req, res, next) => {
  // Get the navigation bar HTML (assuming buildNavigation exists in utilities)
  let nav = await utilities.buildNavigation(); // Ensure buildNavigation is async if it fetches data
  // Determine the error message and status code
  const message = err.message || 'Oh no! Something went wrong.';
  const status = err.status || 500; // Default to 500 Internal Server Error
  // Log the error to the console (optional, good for debugging)
  console.error(`Error at: "${req.originalUrl}": ${err.message}`);
  console.error(err.stack); // Log the stack trace for detailed debugging

  // Render the dedicated error view
  res.status(status).render("errors/error", {
    title: status === 404 ? "404 - Page Not Found" : "Server Error",
    message,
    nav, // Pass nav data to the error view so the header still works
    // Optional: Only pass the full error object in development
    error: process.env.NODE_ENV !== 'production' ? err : null
  });
});


/* ***********************
 * Server Activation
 *************************/
// Define the port the server will listen on.
const port = process.env.PORT || 3000;
// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

