/* ***********************
 * Inventory Controller
 * controllers/inventoryController.js
 *************************/
const invModel = require("../models/inventory-model"); // Import inventory model
const utilities = require("../utilities/"); // Import utilities

const invCont = {}; // Create an object to hold controller functions

/* ***************************
 * Build inventory by classification view
 * (You likely have this already)
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;
  const data = await invModel.getInventoryByClassificationId(classification_id);
  const grid = await utilities.buildClassificationGrid(data);
  let nav = await utilities.buildNavigation(); // Get navigation data
  const className = data[0] ? data[0].classification_name : "Vehicles"; // Get classification name or default
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid, // Pass the generated grid HTML to the view
  });
};

/* ***************************
 * Build inventory detail view by inventory_id
 * Task 1 Requirement
 * ************************** */
invCont.buildByInventoryId = async function (req, res, next) {
  try {
    const inventory_id = req.params.inventoryId; // Get inventory ID from URL parameters
    // Fetch the specific vehicle data from the model
    const vehicleData = await invModel.getVehicleByInventoryId(inventory_id);

    // Check if vehicle data was found
    if (!vehicleData) {
        // If no vehicle found, create a 404 error and pass it to the error handler
        const error = new Error("Vehicle not found");
        error.status = 404;
        return next(error); // Use return to stop further execution in this function
    }

    // Build the HTML for the detail view using the utility function
    const detailHTML = await utilities.buildInventoryDetailHTML(vehicleData);

    // Get navigation data
    let nav = await utilities.buildNavigation();

    // Construct the page title using vehicle make and model
    const pageTitle = `${vehicleData.inv_year} ${vehicleData.inv_make} ${vehicleData.inv_model}`;

    // Render the detail view, passing the title, nav, and generated HTML
    res.render("./inventory/detail", {
      title: pageTitle,
      nav,
      detailHTML, // Pass the generated detail HTML string to the view
    });
  } catch (error) {
    // Catch any unexpected errors during the process
    console.error("Error in buildByInventoryId controller:", error);
    next(error); // Pass the error to the main error handler
  }
};


module.exports = invCont; // Export the controller object
