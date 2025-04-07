/* ***********************
 * Error Controller
 * controllers/errorController.js
 *************************/

const errorCont = {}; // Create controller object

/* ***************************
 * Trigger an intentional 500 error
 * Task 3 Requirement
 * ************************** */
errorCont.triggerError = async function (req, res, next) {
  // Intentionally throw an error to test the error handling middleware
  // The message here will be caught by the error handler in server.js
  throw new Error("Intentional 500 Server Error Triggered!");

  // Note: Code below this line will not execute because the error is thrown.
  // You don't need to render anything here; the main error handler will do it.
};

module.exports = errorCont; // Export the controller object
