require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // this is required for Render
  },
});

async function test() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Connected successfully:", result.rows);
  } catch (err) {
    console.error("Database connection error:", err);
  }
}

test();
