const express = require("express");

const {
  getAllApplications,
  getSingleApplication,
  getDashboardStats,
} = require("../controllers/adminController");

const protect = require("../middleware/authMiddleware");

const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.get(
  "/dashboard-stats",
  protect,
  adminMiddleware,
  getDashboardStats
);

router.get("/applications", protect, adminMiddleware, getAllApplications);

router.get("/applications/:id", protect, adminMiddleware, getSingleApplication);

module.exports = router;
