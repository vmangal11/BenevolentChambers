// routes/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); // For generating tokens
const User = require("../models/User");
const Token = require("../models/Token"); // NEW: Import the Token model
const sendEmail = require("../utils/sendEmail"); // NEW: Import a utility for sending emails
require("dotenv").config();

// @route   POST /api/auth/register
// @desc    Register user
// @access  Public
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: { id: user.id, name: user.name, email: user.email },
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: { id: user.id, name: user.name, email: user.email },
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// routes/auth.js

// ... existing imports

// @route   POST /api/auth/forgot-password
// @desc    Request a password reset link
// @access  Public
router.post("/forgot-password", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .json({ msg: "User with that email does not exist." });
    }

    // NEW: Find and delete any existing token for this user
    await Token.deleteOne({ userId: user._id });

    // Generate a new unique token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash the token before saving it to the database
    const hashedToken = await bcrypt.hash(resetToken, 10);

    // Create and save the new token
    const token = await new Token({
      userId: user._id,
      token: hashedToken,
    }).save();

    // The reset link to be sent via email
    const link = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}&id=${user._id}`;
    
    // Send the email
    await sendEmail(user.email, "Password Reset", link);

    res.status(200).json({ msg: "Password reset link sent to your email." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// @route   POST /api/auth/reset-password
// @desc    Reset password using token
// @access  Public
router.post("/reset-password", async (req, res) => {
  try {
    const { userId, newPassword, token } = req.body;

    // Find the token in the database
    const passwordResetToken = await Token.findOne({ userId });
    if (!passwordResetToken) {
      return res.status(400).json({ msg: "Invalid or expired token." });
    }

    // Compare the token from the request with the hashed token in the database
    const isValidToken = await bcrypt.compare(token, passwordResetToken.token);
    if (!isValidToken) {
      return res.status(400).json({ msg: "Invalid or expired token." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    // Hash the new password and update the user
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    // Delete the used token from the database
    await Token.deleteOne({ userId: user._id });

    res.status(200).json({ msg: "Password reset successfully." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
