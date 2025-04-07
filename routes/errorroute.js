const express = require("express");
const router = express.Router();

// Route to trigger intentional error (Task 3)
router.get("/trigger", (req, res, next) => {
  const err = new Error("Intentional 500 Error - Test");
  err.status = 500;
  next(err);
});

module.exports = router;