const Application = require("../models/Application");

const User = require("../models/User");


exports.getDashboardStats = async (req, res) => {
  try {
    const totalApplications =
      await Application.countDocuments();

    const totalStudents =
      await User.countDocuments({
        role: "student",
      });

    const totalPaidStudents =
      await User.countDocuments({
        hasPurchased: true,
      });

    const pendingPayments =
      await User.countDocuments({
        hasPurchased: false,
      });

    const bscStudents =
      await User.countDocuments({
        selectedCourse: "bsc_nursing",
      });

    const gnmStudents =
      await User.countDocuments({
        selectedCourse: "gnm",
      });

    const postBscStudents =
      await User.countDocuments({
        selectedCourse: "post_bsc",
      });

    res.status(200).json({
      success: true,

      stats: {
        totalApplications,
        totalStudents,
        totalPaidStudents,
        pendingPayments,

        courses: {
          bsc_nursing: bscStudents,
          gnm: gnmStudents,
          post_bsc: postBscStudents,
        },
      },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


exports.getAllApplications = async (req, res) => {
  try {
    const {
      search,
      course,
      paymentStatus,
    } = req.query;

    let filter = {};

    const applications = await Application.find()

      .populate({
        path: "userId",

        match: {
          ...(course && {
            selectedCourse: course,
          }),

          ...(paymentStatus && {
            hasPurchased:
              paymentStatus === "paid",
          }),

          ...(search && {
            $or: [
              {
                name: {
                  $regex: search,
                  $options: "i",
                },
              },

              {
                email: {
                  $regex: search,
                  $options: "i",
                },
              },

              {
                mobile: {
                  $regex: search,
                  $options: "i",
                },
              },
            ],
          }),
        },

        select:
          "name email mobile selectedCourse profileCompleted hasPurchased",
      })

      .sort({ createdAt: -1 });

    const filteredApplications =
      applications.filter(
        (app) => app.userId !== null
      );

    res.status(200).json({
      success: true,

      totalApplications:
        filteredApplications.length,

      applications: filteredApplications,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getSingleApplication = async (req, res) => {
  try {
    const application = await Application.findById(
      req.params.id
    ).populate(
      "userId",
      "name email mobile selectedCourse profileCompleted hasPurchased"
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      application,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};