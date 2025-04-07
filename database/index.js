/* **************************
 * Required Modules
 ************************* */
const { Pool } = require("pg"); // Import the Pool class from the pg library
require("dotenv").config(); // Load environment variables from .env file

/* **************************
 * Connection Pool Configuration
 * ************************** */
let pool;
const connectionAttempts = { count: 0, max: 5, delay: 3000 }; // Retry logic

function createPool() {
  // Check if DATABASE_URL environment variable is set
  if (process.env.DATABASE_URL) {
    console.log("Connecting using DATABASE_URL...");
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false, // Necessary for some cloud database providers
      },
    });
    console.log("Pool created with DATABASE_URL.");
  } else {
    // Otherwise, use individual environment variables
    console.log("Connecting using individual PG variables...");
    pool = new Pool({
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT,
      idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
      connectionTimeoutMillis: 5000, // Wait 5 seconds for connection attempt
    });
    console.log("Pool created with individual PG variables.");
  }

  // Listener for pool errors
  pool.on('error', (err, client) => {
    console.error('!!! Unexpected error on idle client !!!', err);
    // Consider attempting to reconnect or log more details
  });

  // Listener for new client connections (optional)
  pool.on('connect', (client) => {
    // console.log('Client connected to database pool.'); // Can be noisy
  });

  // Listener for client removal (optional)
  pool.on('remove', (client) => {
    // console.log('Client removed from database pool.'); // Can be noisy
  });
}

// Initial pool creation
createPool();

/* **************************
 * Export Query Function
 * ************************** */
module.exports = {
  async query(text, params) {
    let client;
    try {
      // Get a client from the pool
      client = await pool.connect();
      // Execute the query
      const res = await client.query(text, params);
      // console.log("Executed query:", { text }); // Optional: Log successful queries
      return res;
    } catch (error) {
      console.error("!!! Database Query Error !!!");
      console.error("Query Text:", text);
      console.error("Parameters:", params);
      console.error("Error Code:", error.code); // Log specific error code if available
      console.error("Error Details:", error);
      // Re-throw the error so the calling function knows it failed
      throw error;
    } finally {
      // IMPORTANT: Release the client back to the pool
      if (client) {
        client.release();
      }
    }
  },

  // Function to get the pool itself (useful for session stores etc.)
  getPool: () => pool,

  // Test connection function
  async testConnection() {
    let client = null;
    try {
      client = await pool.connect();
      console.log("Successfully got client from database pool.");
      await client.query('SELECT NOW()'); // Simple test query
      console.log("Database test query successful.");
      return true;
    } catch (error) {
      console.error("!!! Database Connection Test Failed !!!", error);
      return false;
    } finally {
      if (client) {
        client.release();
        console.log("Test client released.");
      }
    }
  }
};
