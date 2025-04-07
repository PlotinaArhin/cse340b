/* ***********************
 * Inventory Routes
 * routes/inventoryRoute.js
 *************************/
// Needed Resources
const express = require("express");
const router = new express.Router(); // Create an Express router
const invController = require("../controllers/inventoryController"); // Import inventory controller
const utilities = require("../utilities/"); // Import utilities

// Route to build inventory by classification view
// (You likely have this already)
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build inventory detail view based on inventory ID
// Task 1 Requirement
router.get("/detail/:inventoryId", utilities.handleErrors(invController.buildByInventoryId));

module.exports = router; // Export the router
