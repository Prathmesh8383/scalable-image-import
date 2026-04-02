const express = require("express");
const router = express.Router();

const {
  createUser,
  getUsers,
} = require("../controllers/userController");

const roleMiddleware = require("../middleware/roleMiddleware");

// Only ADMIN can create user
router.post("/", roleMiddleware(["ADMIN"]), createUser);

// ADMIN & ANALYST can view users
router.get("/", roleMiddleware(["ADMIN", "ANALYST"]), getUsers);

module.exports = router;