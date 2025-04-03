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
// Import base controller (assuming you might have one later, or define routes directly)
// For this basic example, we'll define the route directly in server.js
// const baseController = require("./controllers/baseController") // Example if using controllers

/* ***********************
 * View Engine and Templates
 *************************/
// Set EJS as the view engine
app.set("view engine", "ejs");
// Use express-ejs-layouts middleware
app.use(expressLayouts);
// Set the default layout file
app.set("layout", "./layouts/layout"); // assumes you have a layout file at views/layouts/layout.ejs
// Set the directory for view templates
app.set("views", path.join(__dirname, "views"));

/* ***********************
 * Middleware
 *************************/
// Serve static files (CSS, images, etc.) from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

/* ***********************
 * Routes
 *************************/
// Route for the home page
app.get("/", function(req, res){
  // Render the index view
  // The actual rendering might be handled by a controller in a larger app
  // res.render("index", {title: "Home"}) // Example if passing data
  res.render("index", { title: "Home", nav: [] }); // Pass an empty nav array or fetch dynamically if needed
});

/* ***********************
 * Server Activation
 *************************/
// Define the port the server will listen on.
// It will use the PORT from the .env file if available, otherwise default to 3000.
const port = process.env.PORT || 3000;
// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

