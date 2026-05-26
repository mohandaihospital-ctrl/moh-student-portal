const express = require("express");

const {
  createApplication,
} = require("../controllers/applicationController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createApplication);

module.exports = router;