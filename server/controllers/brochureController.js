const streamifier = require("streamifier");

const cloudinary = require("../config/cloudinary");

const Brochure = require("../models/Brochure");

exports.uploadBrochure = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const uploadStream =
      cloudinary.uploader.upload_stream(
        {
          folder: "student-portal-brochures",
          resource_type: "raw",
        },

        async (error, result) => {
          if (error) {
            return res.status(500).json({
              message: error.message,
            });
          }

          const existingBrochure =
            await Brochure.findOne();

          if (existingBrochure) {
            existingBrochure.fileUrl =
              result.secure_url;

            existingBrochure.public_id =
              result.public_id;

            await existingBrochure.save();

            return res.status(200).json({
              success: true,
              message:
                "Brochure updated successfully",
              brochure: existingBrochure,
            });
          }

          const brochure =
            await Brochure.create({
              fileUrl: result.secure_url,

              public_id: result.public_id,
            });

          res.status(201).json({
            success: true,
            message:
              "Brochure uploaded successfully",
            brochure,
          });
        }
      );

    streamifier
      .createReadStream(req.file.buffer)
      .pipe(uploadStream);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getBrochure = async (req, res) => {
  try {

    if (
      req.user.role !== "admin" &&
      !req.user.hasPurchased
    ) {

      return res.status(403).json({
        success: false,
        message:
          "Payment required to access brochure",
      });
    }

    const brochure =
      await Brochure.findOne();

    if (!brochure) {

      return res.status(404).json({
        success: false,
        message:
          "Brochure not found",
      });
    }

    res.status(200).json({
      success: true,
      brochure,
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });
  }
};