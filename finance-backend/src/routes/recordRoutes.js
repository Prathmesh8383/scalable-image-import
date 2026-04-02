const express = require("express");
const router = express.Router();

const {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
} = require("../controllers/recordController");

const roleMiddleware = require("../middleware/roleMiddleware");

// Create record → ADMIN only
router.post("/", roleMiddleware(["ADMIN"]), createRecord);

// Get records → ADMIN + ANALYST
router.get("/", roleMiddleware(["ADMIN", "ANALYST"]), getRecords);

// Update record → ADMIN only
router.put("/:id", roleMiddleware(["ADMIN"]), updateRecord);

// Delete record → ADMIN only
router.delete("/:id", roleMiddleware(["ADMIN"]), deleteRecord);

module.exports = router;