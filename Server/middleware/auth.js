// middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Import your User model
require("dotenv").config();

// Make the middleware function async
module.exports = async function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user in the database using the ID from the token payload
    // and select the fields you need (name, email) while excluding the password.
    const user = await User.findById(decoded.user.id).select("-password");

    // Check if the user exists
    if (!user) {
      return res
        .status(401)
        .json({ msg: "Token is not valid (user not found)" });
    }

    // Assign the full user object to req.user
    // Now, req.user will contain the user's _id, name, and email.
    req.user = user;

    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
