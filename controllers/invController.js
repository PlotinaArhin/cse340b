const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

/* ***************************
 *  Build classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  // Existing code remains the same
};

/* ***************************
 *  Build vehicle detail view (NEW)
 * ************************** */
invCont.buildVehicleDetail = async function (req, res, next) {
  try {
    const inv_id = req.params.inv_id;
    const vehicleData = await invModel.getInventoryItemById(inv_id);
    
    if (!vehicleData) {
      return next(utilities.createError(404, "Vehicle not found"));
    }
    
    const vehicleHTML = utilities.wrapVehicleInHTML(vehicleData);
    let nav = await utilities.getNav();
    
    res.render("./inventory/detail", {
      title: `${vehicleData.inv_make} ${vehicleData.inv_model}`,
      nav,
      vehicleHTML,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = invCont;