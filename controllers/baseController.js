const utilities = require("../utilities");

const baseController = {
  buildHome: async (req, res) => {
    try {
      const nav = await utilities.getNav();
      res.render("index", {
        title: "Home",
        nav,
        errors: null,
      });
    } catch (error) {
      next(error);
    }
  },

  triggerIntentionalError: async (req, res, next) => {
    throw new Error("Intentional 500 Error");
  }
};

module.exports = baseController;