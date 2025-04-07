const express = require("express");
const router = express.Router();
const invController = require("../controllers/inventoryController");
const utilities = require("../utilities");

router.get("/detail/:inv_id", utilities.handleErrors(invController.buildVehicleDetail));

module.exports = router;