/* ***********************
 * Base Controller
 * controllers/baseController.js
 *************************/
const utilities = require("../utilities"); // Import utilities to use buildNavigation
const baseController = {}; // Create an object to hold controller functions

/* ***************************
 * Build the home view
 ************************** */
baseController.buildHome = async function(req, res){
  // Get navigation data using the utility function
  const nav = await utilities.buildNavigation();
  // Render the index view, passing the title and navigation data
  res.render("index", {
    title: "Home",
    nav // Pass the generated navigation HTML to the view
  });
}

module.exports = baseController; // Export the controller object
