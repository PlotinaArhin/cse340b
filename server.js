require('dotenv').config();
const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const port = process.env.PORT || 3000;

// Controllers and Utilities
const utilities = require("./utilities");
const baseController = require("./controllers/baseController");

// Routes
const inventoryRoute = require("./routes/inventoryroute");
const errorRoute = require("./routes/errorroute");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layout/layout");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/inv", inventoryRoute);
app.use("/error", errorRoute);
app.get("/", utilities.handleErrors(baseController.buildHome));

// 404 Handler
app.use((req, res, next) => {
  next({ status: 404, message: "Page Not Found" });
});

// Global Error Handler
app.use(async (err, req, res, next) => {
  const nav = await utilities.getNav();
  const errorDetails = {
    title: `${err.status || 500} Error`,
    message: err.message,
    nav,
    stack: process.env.NODE_ENV === 'development' ? err.stack : null
  };
  res.status(err.status || 500).render("errors/error", errorDetails);
});

app.listen(port, () => console.log(`Server running on port ${port}`));