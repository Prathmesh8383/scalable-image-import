const express = require("express");
const router = express.Router();

const {
  getSummary,
  getCategoryWise,
} = require("../controllers/dashboardController");

const roleMiddleware = require("../middleware/roleMiddleware");

// Analyst & Admin can view dashboard
router.get("/summary", roleMiddleware(["ADMIN", "ANALYST"]), getSummary);
router.get("/category", roleMiddleware(["ADMIN", "ANALYST"]), getCategoryWise);

module.exports = router;