const invModel = require("../models/inventory-model");
const utilities = require("../utilities/"); // Assuming utilities/index.js

const invController = {};

/* ***************************
 * Build inventory by classification view
 * ************************** */
// Keep your existing buildByClassificationId function here...
// invController.buildByClassificationId = async function (req, res, next) { ... };

/* ***************************
 * Build inventory detail view by inventory_id
 * ************************** */
invController.buildByInventoryId = async function (req, res, next) {
  // Extract inventoryId from the request parameters
  const inventoryId = req.params.inventoryId;
  // Fetch vehicle data using the model function
  const data = await invModel.getInventoryByInventoryId(inventoryId);

  // Check if data was found
  if (data) {
    // Build the HTML grid using the utility function
    const detailGrid = await utilities.buildInventoryDetailHTML(data);
    // Get the navigation HTML (assuming buildNav is in utilities)
    let nav = await utilities.getNav();
    // Construct the page title
    const pageTitle = data.inv_year + ' ' + data.inv_make + ' ' + data.inv_model;
    // Render the detail view
    res.render("./inventory/detail", {
      title: pageTitle,
      nav,
      detailGrid, // Pass the generated HTML grid to the view
      errors: null, // Initialize errors as null
    });
  } else {
    // If no data is found, trigger an error
    const err = new Error("Vehicle not found.");
    err.status = 404; // Not Found status
    next(err); // Pass the error to the error handling middleware
  }
};


module.exports = invController;
