const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

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

exports.getMe = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};