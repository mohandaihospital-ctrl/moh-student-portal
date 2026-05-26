const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    mobile: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    selectedCourse: {
      type: String,
      enum: ["bsc_nursing", "post_bsc", "gnm"],
      required: true,
    },

    role: {
      type: String,
      default: "student",
    },

    profileCompleted: {
      type: Boolean,
      default: false,
    },

    hasPurchased: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);