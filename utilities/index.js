/* ****************************************
 * utilities/index.js
 * This file contains utility functions for the application.
 * It includes functions for building navigation, handling errors,
 * and formatting data for display.
 **************************************** */
const invModel = require("../models/inventory-model"); // Required for buildNavigation
const jwt = require("jsonwebtoken"); // If using JWT for account features later
require("dotenv").config(); // If using JWT

const Util = {};

/* ***********************
 * Constructs the nav HTML unordered list
 * Assumes you have a function to get classifications from the DB
 *************************/
Util.buildNavigation = async function (req, res, next) {
  // Fetch classification data from the model
  let data = await invModel.getClassifications();
  // Start building the HTML list
  let list = "<ul>";
  // Add the 'Home' link
  list += '<li><a href="/" title="Home page">Home</a></li>';
  // Iterate through each classification and add a list item with a link
  data.rows.forEach((row) => {
    list += "<li>";
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">';
    list += row.classification_name;
    list += "</a>";
    list += "</li>";
  });
  // Close the HTML list
  list += "</ul>";
  return list; // Return the generated HTML string
};


/* **************************************
 * Build the classification view HTML
 * (You likely have this from previous work)
 ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid;
  if(data.length > 0){
    grid = '<ul id="inv-display">';
    data.forEach(vehicle => {
      grid += '<li>';
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model
      + ' details"><img src="' + vehicle.inv_thumbnail
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model
      +' on CSE Motors" /></a>';
      grid += '<div class="namePrice">';
      grid += '<hr />';
      grid += '<h2>';
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View '
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">';
      grid += vehicle.inv_make + ' ' + vehicle.inv_model + '</a>';
      grid += '</h2>';
      grid += '<span>$'
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>';
      grid += '</div>';
      grid += '</li>';
    });
    grid += '</ul>';
  } else {
    grid = '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }
  return grid;
};

/* **************************************
 * Build the single inventory item detail view HTML
 * Task 1 Requirement
 ************************************ */
Util.buildInventoryDetailHTML = async function(vehicle) {
  // Check if vehicle data exists
  if (!vehicle) {
    return '<p class="notice">Sorry, the requested vehicle could not be found.</p>';
  }

  // Format Price (US Dollars, with commas)
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0, // Optional: remove cents if always whole dollars
    maximumFractionDigits: 0
  }).format(vehicle.inv_price);

  // Format Mileage (with commas)
  const formattedMileage = new Intl.NumberFormat('en-US').format(vehicle.inv_miles);

  // Start building the HTML structure using template literals
  let detailHTML = `
    <div class="vehicle-detail-container">
      <div class="vehicle-image">
        <img src="${vehicle.inv_image}" alt="Image of ${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}">
      </div>
      <div class="vehicle-info">
        <h2>${vehicle.inv_make} ${vehicle.inv_model} Details</h2>
        <p class="price"><strong>Price:</strong> ${formattedPrice}</p>
        <p><strong>Year:</strong> ${vehicle.inv_year}</p>
        <p><strong>Mileage:</strong> ${formattedMileage}</p>
        <p><strong>Color:</strong> ${vehicle.inv_color}</p>
        <p><strong>Description:</strong> ${vehicle.inv_description}</p>
        <%# Add any other relevant fields from your DB schema here %>
        <%# e.g., <p><strong>Transmission:</strong> ${vehicle.inv_transmission}</p> %>
      </div>
    </div>
  `;

  return detailHTML; // Return the generated HTML string
};


/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

/* ****************************************
* Middleware to check token validity
* (Example if you add account features later)
**************************************** */
Util.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
   jwt.verify(
    req.cookies.jwt,
    process.env.ACCESS_TOKEN_SECRET,
    function (err, accountData) {
     if (err) {
      req.flash("notice", "Please log in")
      res.clearCookie("jwt")
      return res.redirect("/account/login")
     }
     res.locals.accountData = accountData
     res.locals.loggedin = 1
     next()
    })
  } else {
   next()
  }
 }

module.exports = Util; // Export the utilities object
