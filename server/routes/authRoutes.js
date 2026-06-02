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

router.get("/email-test", async (req, res) => {
  try {
    await sendEmail(
      "yourpersonalemail@gmail.com",
      "Test Email",
      "<h1>Test</h1>"
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
});

router.get("/me", protect, getMe);

module.exports = router;