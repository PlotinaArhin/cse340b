const { Pool } = require("pg");
require("dotenv").config();

/* **************
 * Connection Pool
 * SSL Object needed for both environments but with different configurations
 * ************** */
let pool;
if (process.env.NODE_ENV === "development") {
    // Development configuration with relaxed SSL settings
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false, // For local/dev testing only
        },
    });

    // Add troubleshooting queries
    module.exports = {
        async query(text, params) {
            try {
                const res = await pool.query(text, params);
                console.log("executed query", { text });
                return res;
            } catch (error) {
                console.error("error in query", { text });
                throw error;
            }
        },
    };
} else {
    // Production configuration with secure SSL settings
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: true, // Verify SSL certificate
            // For added security, include your CA certificate here:
            // ca: process.env.CA_CERT 
        },
    });
    module.exports = pool;
}