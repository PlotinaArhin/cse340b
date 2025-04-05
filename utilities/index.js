const invModel = require("../models/inventory-model"); // May need model for other utils
const Util = {};

/* ************************
 * Constructs the nav HTML unordered list
 * (Keep your existing getNav function here)
 ************************* */
// Util.getNav = async function (req, res, next) { ... }

/* ************************
 * Build the classification view HTML
 * (Keep your existing buildClassificationGrid function here)
 ************************* */
// Util.buildClassificationGrid = async function(data){ ... }

/* **************************************
* Build the inventory detail view HTML
* ************************************ */
Util.buildInventoryDetailHTML = async function(data) {
  let grid = '';
  if (data) {
    // Format price and mileage
    const formattedPrice = Util.formatCurrency(data.inv_price); // Use helper
    const formattedMileage = Util.formatNumber(data.inv_miles); // Use helper

    grid = `
      <div class="detail-container">
        <div class="detail-image">
          <img src="${data.inv_image}" alt="Image of ${data.inv_make} ${data.inv_model}">
        </div>
        <div class="detail-info">
          <h2>${data.inv_make} ${data.inv_model} Details</h2>
          <p class="detail-price"><strong>Price:</strong> ${formattedPrice}</p>
          <p><strong>Description:</strong> ${data.inv_description}</p>
          <p><strong>Color:</strong> ${data.inv_color}</p>
          <p><strong>Mileage:</strong> ${formattedMileage}</p>
          <p><strong>Year:</strong> ${data.inv_year}</p>
          <%# Add any other relevant data fields here %>
        </div>
      </div>
    `;
  } else {
    grid = '<p class="notice">Sorry, no matching vehicle could be found.</p>';
  }
  return grid;
};


/* **************************************
* Format number as US Currency
* ************************************ */
Util.formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2, // Ensure cents are shown, e.g., $16,999.00
  }).format(amount);
};


/* **************************************
* Format number with commas
* ************************************ */
Util.formatNumber = (number) => {
  return new Intl.NumberFormat('en-US').format(number);
};


/* ****************************************
* Middleware For Handling Errors
* Wrap other function in this for
* General Error Handling
**************************************** */
// Keep your existing handleErrors function here
// Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util;
