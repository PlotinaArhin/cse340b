const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

// Always use SSL unless explicitly turned off
const useSSL = process.env.SSL === "true" || process.env.NODE_ENV === "production";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: useSSL ? { rejectUnauthorized: false } : false,
});

module.exports = {
  query: async (text, params) => {
    try {
      const res = await pool.query(text, params);
      return res;
    } catch (error) {
      console.error("Error in query", { text, error });
      throw error;
    }
  },
};
