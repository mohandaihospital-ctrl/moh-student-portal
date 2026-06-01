const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const sendEmail = require(
  "../utils/sendEmail"
);
const Otp = require("../models/Otp");



const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

exports.registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      password,
      selectedCourse,
    } = req.body;

const verifiedOtp =
  await Otp.findOne({
    email,
    isVerified: true,
  });

if (!verifiedOtp) {

  return res.status(400).json({
    message:
      "Please verify your email first",
  });
}

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
      selectedCourse,
    });

await Otp.deleteMany({
  email,
});

    res.status(201).json({
      success: true,
      token: generateToken(user._id),

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        selectedCourse: user.selectedCourse,
        role: user.role,
        profileCompleted: user.profileCompleted,
        hasPurchased: user.hasPurchased,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.sendOtp = async (
  req,
  res
) => {

  try {

    const { email } =
      req.body;

    const userExists =
      await User.findOne({
        email,
      });

    if (userExists) {

      return res
        .status(400)
        .json({
          message:
            "Email already registered",
        });
    }

    const otp =
      Math.floor(
        100000 +
          Math.random() *
            900000
      ).toString();

    await Otp.deleteMany({
      email,
    });

    await Otp.create({
      email,
      otp,

      expiresAt:
        new Date(
          Date.now() +
            10 *
              60 *
              1000
        ),
    });

    await sendEmail(
  email,
  "Email Verification - MOH Student Portal",

  `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">

    <div style="background:#0f172a;padding:20px;text-align:center;">
      <h2 style="color:white;margin:0;">
        MOH Student Portal
      </h2>
    </div>

    <div style="padding:30px;background:#ffffff;">

      <h3 style="color:#111827;">
        Email Verification
      </h3>

      <p>
        Dear Student,
      </p>

      <p>
        Thank you for registering with the MOH Student Portal.
      </p>

      <p>
        Please use the following OTP to verify your email address:
      </p>

      <div
        style="
          background:#f3f4f6;
          padding:20px;
          text-align:center;
          border-radius:10px;
          margin:20px 0;
        "
      >

        <h1
          style="
            letter-spacing:8px;
            color:#2563eb;
            margin:0;
          "
        >
          ${otp}
        </h1>

      </div>

      <p>
        This OTP is valid for
        <strong>10 minutes</strong>.
      </p>

      <p>
        Do not share this OTP with anyone.
      </p>

      <p>
        If you did not request this verification,
        please ignore this email.
      </p>

    </div>

    <div
      style="
        background:#f8fafc;
        padding:15px;
        text-align:center;
        font-size:12px;
        color:#64748b;
      "
    >

      © MOH Student Portal

    </div>

  </div>
  `
);

    res.json({
      success: true,
      message:
        "OTP sent successfully",
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });
  }
};

exports.verifyOtp = async (
  req,
  res
) => {

  try {

    const {
      email,
      otp,
    } = req.body;

    const otpRecord =
      await Otp.findOne({
        email,
        otp,
      });

    if (!otpRecord) {

      return res
        .status(400)
        .json({
          message:
            "Invalid OTP",
        });
    }

    if (
      otpRecord.expiresAt <
      new Date()
    ) {

      return res
        .status(400)
        .json({
          message:
            "OTP expired",
        });
    }

    otpRecord.isVerified = true;
await otpRecord.save();

    res.json({
      success: true,
      message:
        "Email verified",
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    res.status(200).json({
      success: true,
      token: generateToken(user._id),

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        selectedCourse: user.selectedCourse,
        role: user.role,
        profileCompleted: user.profileCompleted,
        hasPurchased: user.hasPurchased,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



exports.forgotPassword = async (
  req,
  res
) => {

  try {

    const { email } =
      req.body;

    const user =
      await User.findOne({
        email,
      });

    if (!user) {

      return res
        .status(404)
        .json({
          message:
            "User not found",
        });
    }

    const otp =
      Math.floor(
        100000 +
          Math.random() *
            900000
      ).toString();

    await Otp.deleteMany({
      email,
    });

    await Otp.create({
      email,
      otp,

      expiresAt:
        new Date(
          Date.now() +
            10 *
              60 *
              1000
        ),
    });

    await sendEmail(
  email,
  "Password Reset - MOH Student Portal",

  `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">

    <div style="background:#0f172a;padding:20px;text-align:center;">
      <h2 style="color:white;margin:0;">
        MOH Student Portal
      </h2>
    </div>

    <div style="padding:30px;background:#ffffff;">

      <h3 style="color:#111827;">
        Password Reset Request
      </h3>

      <p>
        Dear Student,
      </p>

      <p>
        We received a request to reset your account password.
      </p>

      <p>
        Please use the following OTP to continue:
      </p>

      <div
        style="
          background:#f3f4f6;
          padding:20px;
          text-align:center;
          border-radius:10px;
          margin:20px 0;
        "
      >

        <h1
          style="
            letter-spacing:8px;
            color:#2563eb;
            margin:0;
          "
        >
          ${otp}
        </h1>

      </div>

      <p>
        This OTP is valid for
        <strong>10 minutes</strong>.
      </p>

      <p>
        If you did not request a password reset,
        please ignore this email and your password
        will remain unchanged.
      </p>

      <p>
        For security reasons, do not share this OTP
        with anyone.
      </p>

    </div>

    <div
      style="
        background:#f8fafc;
        padding:15px;
        text-align:center;
        font-size:12px;
        color:#64748b;
      "
    >

      © MOH Student Portal

    </div>

  </div>
  `
);

    res.json({
      success: true,
      message:
        "OTP sent successfully",
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });
  }
};

exports.resetPassword = async (
  req,
  res
) => {

  try {

    const {
      email,
      password,
    } = req.body;

    const otpRecord =
      await Otp.findOne({
        email,
        isVerified: true,
      });

    if (!otpRecord) {

      return res
        .status(400)
        .json({
          message:
            "OTP verification required",
        });
    }

    const user =
      await User.findOne({
        email,
      });

    if (!user) {

      return res
        .status(404)
        .json({
          message:
            "User not found",
        });
    }

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/;

if (
  password.length < 8 ||
  !passwordRegex.test(
    password
  )
) {

  return res.status(400).json({
    message:
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number",
  });
}

    const isSamePassword =
  await bcrypt.compare(
    password,
    user.password
  );

if (isSamePassword) {

  return res.status(400).json({
    message:
      "New password cannot be the same as your current password",
  });
}

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    user.password =
      hashedPassword;

    await user.save();

    await Otp.deleteMany({
      email,
    });

    res.json({
      success: true,
      message:
        "Password updated successfully",
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};