const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Test database connection
pool.query('SELECT NOW()', (err) => {
  if (err) console.error('Database connection error:', err.stack);
  else console.log('Database connected successfully');
});

module.exports = {
  pool,
  getPool: () => pool,
  testConnection: async () => {
    try {
      await pool.query('SELECT 1');
      return true;
    } catch (error) {
      return false;
    }
  }
};