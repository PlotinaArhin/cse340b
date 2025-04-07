/* ***********************
 * Error Trigger Route
 * routes/errorRoute.js
 *************************/
// Needed Resources
const express = require("express");
const router = new express.Router(); // Create an Express router
const errorController = require("../controllers/errorcontroller"); // Import error controller
const utilities = require("../utilities"); // Import utilities (for handleErrors)

// Route to trigger an intentional server error
// Task 3 Requirement
router.get("/trigger", utilities.handleErrors(errorController.triggerError));

module.exports = router; // Export the router
