/* ***********************
 * Inventory Model
 * models/inventory-model.js
 *************************/
const pool = require("../database"); // Assuming you have db.js for database connection pool

/* ***************************
 * Get all classification data
 * (You likely have this already)
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name");
}

/* ***************************
 * Get all inventory items and classification_name by classification_id
 * (You likely have this already)
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i
      JOIN public.classification AS c
      ON i.classification_id = c.classification_id
      WHERE i.classification_id = $1`,
      [classification_id]
    );
    return data.rows;
  } catch (error) {
    console.error("getclassificationsbyid error " + error);
    // It might be better to throw the error here to be caught by the error handler
    // throw error;
    return []; // Or return empty array on error
  }
}

/* ***************************
 * Get a single vehicle's data by inventory_id
 * Task 1 Requirement
 * ************************** */
async function getVehicleByInventoryId(inventory_id) {
  try {
    // Use a parameterized query to prevent SQL injection
    const query = `SELECT * FROM public.inventory WHERE inv_id = $1`;
    const result = await pool.query(query, [inventory_id]);
    // Check if any rows were returned
    if (result.rows.length > 0) {
      return result.rows[0]; // Return the first (and only) row found
    } else {
      return null; // Return null if no vehicle found with that ID
    }
  } catch (error) {
    console.error("getVehicleByInventoryId error: " + error);
    // Re-throw the error to be caught by the central error handler
    throw error;
  }
}


module.exports = {
    getClassifications,
    getInventoryByClassificationId,
    getVehicleByInventoryId // Export the new function
};
