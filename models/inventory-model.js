const pool = require('../database/');

const inventoryModel = {
  getVehicleById: async (inv_id) => {
    const query = `
      SELECT inv_id, inv_make, inv_model, inv_year, inv_description, 
             inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, 
             classification_id 
      FROM inventory 
      WHERE inv_id = $1`;
    const values = [inv_id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }
};

module.exports = inventoryModel;