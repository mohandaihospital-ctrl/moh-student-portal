const mongoose = require("mongoose");

const brochureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Main Brochure",
    },

    fileUrl: {
      type: String,
      required: true,
    },

    public_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Brochure",
  brochureSchema
);