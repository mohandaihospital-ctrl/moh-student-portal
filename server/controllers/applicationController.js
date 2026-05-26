const Application =
  require("../models/Application");

const User =
  require("../models/User");

exports.createApplication =
  async (req, res) => {

    try {

      const {
        formData,
        documents,
      } = req.body;

      console.log(
        "REQ USER:",
        req.user._id
      );

      const existingApplication =
        await Application.findOne({
          userId: req.user._id,
        });

      console.log(
        "EXISTING APPLICATION:",
        existingApplication
      );

      if (existingApplication) {
        return res.status(400).json({
          message:
            "Application already submitted",
        });
      }

      const application =
        await Application.create({
          userId: req.user._id,

          formData,

          documents,

          isSubmitted: true,

          status: "pending",
        });

      await User.findByIdAndUpdate(
        req.user._id,
        {
          profileCompleted: true,
        }
      );

      res.status(201).json({
        success: true,

        message:
          "Application submitted successfully",

        application,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });

    }
  };