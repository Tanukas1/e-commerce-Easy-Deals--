const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Guest login controller
async function guestLogin(req, res) {
  try {
    const { name, phone, email, address, pinCode, city } = req.body;

    // Validate input
    if (!name || !phone || !email || !address || !pinCode || !city) {
      return res.status(400).json({
        success: false,
        message: "All fields are required. Please provide name, phone, email, address, pinCode, and city.",
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists. Please use a different email or log in.",
      });
    }

    // Create a new guest user
    const newGuest = new User({
      name,
      phone,
      email,
      address,
      pinCode,
      city,
      isGuest: true,
    });

    const savedGuest = await newGuest.save();

    res.status(201).json({
      success: true,
      message: "Guest login successful",
      guestData: savedGuest, // Return saved guest data
    });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      res.status(400).json({
        success: false,
        message: "Email already exists. Please use a different email.",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error. Please try again later.",
      });
    }
  }
}


// Signup: Register a new user
async function postSignup(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, email, password) are required.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please login.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();

    // Generate a token after successful signup (you can log the user in immediately after signup)
    const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: { id: newUser._id, name, email },
      token, // Return token to log the user in immediately
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to register user. Please try again later.",
    });
  }
}

// Signin: Authenticate user and generate JWT token
async function postSignin(req, res) {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please check your email.",
      });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password. Please try again.",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send response with user data and token
    res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to login. Please try again later.",
    });
  }
}


module.exports = { postSignup, postSignin, guestLogin };