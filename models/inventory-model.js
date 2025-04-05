const pool = require("../database/"); // Your database connection setup

/* ***************************
 * Get all classification data
 * ************************** */
// Keep your existing getClassification function here...
// async function getClassifications(){ ... }

/* ***************************
 * Get all inventory items and classification_name by classification_id
 * ************************** */
// Keep your existing getInventoryByClassificationId function here...
// async function getInventoryByClassificationId(classification_id) { ... }

/* ***************************
 * Get inventory item data by inventory_id
 * ************************** */
async function getInventoryByInventoryId(inventory_id) {
  try {
    // Use a parameterized query to prevent SQL injection
    const sql = "SELECT * FROM public.inventory WHERE inv_id = $1";
    const data = await pool.query(sql, [inventory_id]);
    // Check if any rows were returned
    if (data.rows.length > 0) {
      return data.rows[0]; // Return the first (and only) row
    } else {
      return null; // Return null if no vehicle found with that ID
    }
  } catch (error) {
    console.error("getinventorybyinventoryid error " + error);
    // In a real application, you might want to throw the error
    // or return a specific error object. For now, returning null.
    return null;
  }
}


module.exports = {
  // getClassifications, // Export existing functions
  // getInventoryByClassificationId, // Export existing functions
  getInventoryByInventoryId // Export the new function
};
