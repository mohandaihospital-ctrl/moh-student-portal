const express = require("express");

const { createOrder , verifyPayment , getMyPayment } = require("../controllers/paymentController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create-order", protect, createOrder);
router.post("/verify", protect, verifyPayment);
router.get(
  "/my-payment",
  protect,
  getMyPayment
);

module.exports = router;
