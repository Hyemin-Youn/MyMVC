const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const middlewareObj = require("../middleware/authMiddleware");

console.log("authController =", authController);
console.log("authController.me =", authController.me);
console.log("middlewareObj =", middlewareObj);

const { requireAuth } = middlewareObj;

router.post("/login", authController.login);
router.get("/me", requireAuth, authController.me);

module.exports = router;

