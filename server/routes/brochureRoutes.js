const express = require("express");

const {
  uploadBrochure,
  getBrochure,
} = require("../controllers/brochureController");

const protect = require("../middleware/authMiddleware");

const adminMiddleware = require(
  "../middleware/adminMiddleware"
);

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post(
  "/upload",
  protect,
  adminMiddleware,
  upload.single("file"),
  uploadBrochure
);

router.get("/", protect, getBrochure);

module.exports = router;