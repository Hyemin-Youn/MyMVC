const express = require("express");
const router = express.Router();
const addressController = require("../controllers/addressController");
const { requireAuth } = require("../middleware/authMiddleware");

router.get("/", requireAuth, addressController.getList);
router.post("/", requireAuth, addressController.insert);
router.put("/:id", requireAuth, addressController.update);
router.delete("/:id", requireAuth, addressController.remove);

module.exports = router;
