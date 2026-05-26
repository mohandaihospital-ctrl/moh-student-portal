const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    razorpay_order_id: {
      type: String,
    },

    razorpay_payment_id: {
      type: String,
    },

    razorpay_signature: {
      type: String,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    invoiceUrl: {
      type: String,
      default: "",
    },
   
    invoiceNumber: {
  type: String,
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Payment",
  paymentSchema
);