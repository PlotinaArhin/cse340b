     // Existing routes and requires...
     const express = require("express");
     const router = new express.Router();
     const invController = require("../controllers/invController");
     const utilities = require("../utilities/"); // Assuming utilities/index.js handles exports
 
     // Route to build inventory by classification view
     router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));
 
     // Route to build inventory detail view
     // Use a parameter name like :invId to capture the inventory ID from the URL
     router.get("/detail/:invId", utilities.handleErrors(invController.buildByInventoryId));
 
     module.exports = router;