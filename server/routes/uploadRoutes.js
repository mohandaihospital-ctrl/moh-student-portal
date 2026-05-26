const express = require("express");

const {
  uploadDocument,
} = require("../controllers/uploadController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post(
  "/document",
  protect,
  upload.single("file"),
  uploadDocument
);

module.exports = router;