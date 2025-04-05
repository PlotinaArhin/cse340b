    /* ***********************
     * Require Statements
     * *************************/
    const express = require("express");
    const expressLayouts = require("express-ejs-layouts");
    const env = require("dotenv").config();
    const app = express();
    const staticRoutes = require("./routes/static");
    const inventoryRoute = require("./routes/inventoryRoute"); // Make sure you require your inventory routes
    const baseController = require("./controllers/baseController");
    const utilities = require("./utilities/"); // Make sure utilities are required

    /* ***********************
     * View Engine and Templates
     * *************************/
    app.set("view engine", "ejs");
    app.use(expressLayouts);
    app.set("layout", "./layouts/layout");
    app.set("views", "./views");

    /* ***********************
     * Middleware
     * *************************/
    app.use(express.static("public"));

    /* ***********************
     * Routes
     * *************************/
    app.use(staticRoutes);
    // Index route
    app.get("/", utilities.handleErrors(baseController.buildHome));
    // Inventory routes
    app.use("/inv", inventoryRoute); // Use the inventory routes

    // Intentional Error Trigger Route - Task 3 [cite: 18, 20]
    app.get("/trigger-error", (req, res, next) => {
      // Intentionally throw an error
      // The error handling middleware below will catch this
      next(new Error("Oh no! Intentional Server Error triggered!"));
    });


    /* ***********************
     * Error Handling Middleware
     * *************************/
    // File Not Found Route - must be last route prior to error handler [cite: 16]
    // Make sure this uses the '*' wildcard and is placed correctly
    app.use(async (req, res, next) => {
      const err = new Error("File Not Found");
      err.status = 404;
      next(err); // Pass the 404 error to the general error handler
    });

    // Express Error Handler - Must be the very last middleware [cite: 16, 52]
    // This handles all errors passed via next(err)
    app.use(async (err, req, res, next) => {
      let nav = await utilities.getNav(); // Get nav for the error page
      console.error(`Error at: "${req.originalUrl}": ${err.message}`);
      // Determine the message to display
      let message;
      if (err.status == 404) {
        message = err.message; // Use the specific 404 message
      } else {
        // For 500 or other errors
        message = 'Oh no! There was a crash. Maybe try a different route?';
      }
      // Render the error view
      res.render("errors/error", { // Ensure you have views/errors/error.ejs
        title: err.status || 'Server Error', // Use error status or default title
        message,
        nav, // Pass nav to the error view
        // Do not pass the full 'err' object in production for security reasons
      });
    });


    /* ***********************
     * Local Server Information
     * *************************/
    const port = process.env.PORT || 3000;
    const host = process.env.HOST || 'localhost';

    /* ***********************
     * Log statement to confirm server operation
     * *************************/
    app.listen(port, () => {
      console.log(`app listening on ${host}:${port}`);
    });
    