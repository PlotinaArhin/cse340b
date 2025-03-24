const invModel = require("../models/inventory-model");
const Util = {};

/* *********************
* Constructs the nav HTML unordered list (FIXED)
*********************** */
Util.getNav = async function () {
  try {
    const data = await invModel.getClassifications();
    let list = '<ul>';
    list += '<li><a href="/" title="Home page">Home</a></li>';
    
    data.rows.forEach((row) => {
      list += `<li>
        <a href="/inv/type/${row.classification_name}" 
           title="See our inventory of ${row.classification_name} vehicles">
          ${row.classification_name}
        </a>
      </li>`;
    });
    
    list += '</ul>';
    return list;
  } catch (error) {
    console.error('Error building navigation:', error);
    return '<ul><li>Error loading navigation</li></ul>';
  }
};

/* **************************************
* Build the classification view HTML (FIXED)
************************************* */
Util.buildClassificationGrid = async function(data) {
  let grid = ''; // Initialize grid
  
  if(data.length > 0) {
    grid = '<ul id="inv-display">';
    data.forEach(vehicle => {
      grid += `
        <li>
          <a href="/inv/detail/${vehicle.inv_id}" 
             title="View ${vehicle.inv_make} ${vehicle.inv_model} details">
            <img src="${vehicle.inv_thumbnail}" 
                 alt="Image of ${vehicle.inv_make} ${vehicle.inv_model} on CSE Motors">
          </a>
          <div class="namePrice">
            <hr>
            <h2>
              <a href="/inv/detail/${vehicle.inv_id}" 
                 title="View ${vehicle.inv_make} ${vehicle.inv_model} details">
                ${vehicle.inv_make} ${vehicle.inv_model}
              </a>
            </h2>
            <span>${new Intl.NumberFormat('en-US', { 
              style: 'currency', 
              currency: 'USD' 
            }).format(vehicle.inv_price)}</span>
          </div>
        </li>`;
    });
    grid += '</ul>';
  } else {
    grid = '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }
  return grid;
};

/* **************************************
* NEW: Vehicle detail wrapper (REQUIRED FOR TASK 1)
************************************* */
Util.wrapVehicleInHTML = function(vehicle) {
  return `
    <div class="vehicle-detail">
      <img src="${vehicle.inv_image}" 
           alt="${vehicle.inv_make} ${vehicle.inv_model} full-size image">
      <div class="vehicle-specs">
        <h2>${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}</h2>
        <p><strong>Price:</strong> ${new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(vehicle.inv_price)}</p>
        <p><strong>Mileage:</strong> ${vehicle.inv_miles.toLocaleString()} miles</p>
        <p><strong>Description:</strong> ${vehicle.inv_description}</p>
        <p><strong>Color:</strong> ${vehicle.inv_color}</p>
      </div>
    </div>`;
};

module.exports = Util;