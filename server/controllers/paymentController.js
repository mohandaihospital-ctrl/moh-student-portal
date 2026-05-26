const Razorpay = require("razorpay");
const crypto = require("crypto");

const User = require("../models/User");
const Payment = require("../models/Payment");
const Application = require("../models/Application");
const PAYMENT_CONFIG =
  require("../config/payment");
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
  try {

    const existingPayment =
      await Payment.findOne({
        userId: req.user._id,
        paymentStatus: "paid",
      });

    if (existingPayment) {

      return res.status(400).json({
        success: false,
        message:
          "Payment already completed",
      });
    }

    const application =
      await Application.findOne({
        userId: req.user._id,
      });

    if (!application) {

      return res.status(400).json({
        success: false,
        message:
          "Complete Your Profile First",
      });
    }

    const options = {
amount:
  PAYMENT_CONFIG.ADMISSION_AMOUNT * 100,
      currency: "INR",

      receipt: `receipt_${Date.now()}`,
    };

    const order =
      await razorpay.orders.create(
        options
      );

    res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

exports.verifyPayment = async (req, res) => {
  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const sign =
      razorpay_order_id +
      "|" +
      razorpay_payment_id;

    const expectedSign =
      crypto
        .createHmac(
          "sha256",
          process.env.RAZORPAY_KEY_SECRET
        )
        .update(
          sign.toString()
        )
        .digest("hex");

    const isAuthentic =
      expectedSign ===
      razorpay_signature;

    if (!isAuthentic) {

      return res.status(400).json({
        success: false,
        message:
          "Invalid signature",
      });
    }

    const existingPayment =
      await Payment.findOne({
        razorpay_payment_id,
      });

    if (existingPayment) {

      return res.status(400).json({
        success: false,
        message:
          "Payment already verified",
      });
    }

    const application =
      await Application.findOne({
        userId: req.user._id,
      });

    if (!application) {

      return res.status(400).json({
        success: false,
        message:
          "Application not found",
      });
    }

    const payment =
      await Payment.create({

        userId:
          req.user._id,

        applicationId:
          application._id,

amount:
  PAYMENT_CONFIG.ADMISSION_AMOUNT,
         razorpay_order_id,

        razorpay_payment_id,

        razorpay_signature,

        paymentStatus:
          "paid",

        invoiceNumber:
          `INV-${Date.now()}`,
      });

    await User.findByIdAndUpdate(
      req.user._id,
      {
        hasPurchased: true,
      }
    );

    res.status(200).json({
      success: true,
      message:
        "Payment verified successfully",
      payment,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


exports.getMyPayment = async (req, res) => {
  try {
    const payment = await Payment.findOne({
      userId: req.user._id,
      paymentStatus: "paid",
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      payment,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};