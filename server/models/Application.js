const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    formData: {
      type: Object,
      default: {},
    },

    documents: {
      type: Object,
      default: {},
    },

    isSubmitted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Application",
  applicationSchema
);