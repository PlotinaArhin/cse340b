const { Pool } = require("pg")
require("dotenv").config()
/* **************
 * Connection Pool
 * SSL Object needed for local testing of app
 * But will cause problems in production environment // <= Note: This comment might now be misleading if production ALSO needs SSL.
 * If - else will make determination which to use
 * ************** */
let pool
if (process.env.NODE_ENV == "development") {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { // <- Already present for development
            rejectUnauthorized: false,
        },
    })

    // Added for troubleshooting queries
    // during development
    module.exports = {
        async query(text, params) {
            try {
                const res = await pool.query(text, params)
                console.log("executed query", { text })
                return res
            } catch (error) {
                console.error("error in query", { text })
                throw error
            }
        },
    }
} else { // This block runs for non-development environments
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        // --- Correction is added here ---
        ssl: {
            rejectUnauthorized: false, // Add this line as instructed for non-dev environments too
        },
        // ---------------------------------
    })
    module.exports = pool
}