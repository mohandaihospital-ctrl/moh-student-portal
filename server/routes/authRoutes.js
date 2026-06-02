const express = require("express");

const {
  registerUser,
  sendOtp,
verifyOtp,
  loginUser,
  forgotPassword,
  resetPassword,
  getMe,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const {
  sendEmail,
} = require("../utils/sendEmail");


const router = express.Router();

router.post("/register", registerUser);

router.post(
  "/send-otp",
  sendOtp
);

router.post(
  "/verify-otp",
  verifyOtp
);

router.post("/login", loginUser);

router.post(
  "/forgot-password",
  forgotPassword
);

router.post(
  "/reset-password",
  resetPassword
);



router.get("/me", protect, getMe);

module.exports = router;