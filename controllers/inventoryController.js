const inventoryModel = require("../models/inventory-model");
const utilities = require("../utilities");

const invController = {
  buildVehicleDetail: async (req, res, next) => {
    try {
      const inv_id = parseInt(req.params.inv_id);
      const vehicleData = await inventoryModel.getVehicleById(inv_id);
      
      if (!vehicleData) {
        return next({ status: 404, message: "Vehicle not found" });
      }

      res.render("inventory/detail", {
        title: `${vehicleData.inv_year} ${vehicleData.inv_make} ${vehicleData.inv_model}`,
        nav: await utilities.getNav(),
        detailHTML: utilities.buildVehicleDetailHTML(vehicleData)
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = invController;