// Backend/controllers/authController.js

const crypto = require("crypto");
const bcrypt = require("bcrypt");
const User = require("../models/User"); // Adjust the path to your User model
const sendEmail = require("../utils/sendEmail");

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Generate a unique reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiration = Date.now() + 3600000; // Token valid for 1 hour

    // Save the token and expiration to the user record
    user.resetToken = resetToken;
    user.tokenExpiration = tokenExpiration;
    await user.save();

    // Send email with reset link
    const resetUrl = `${req.protocol}://${req.get("host")}/reset-password?token=${resetToken}`;
    const message = `Click the link to reset your password: ${resetUrl}`;
    await sendEmail(user.email, "Password Reset", message);

    res.status(200).json({ message: "Password reset email sent." });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    // Find user by reset token and check token expiration
    const user = await User.findOne({
      resetToken: token,
      tokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    // Hash the new password and update user record
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = undefined; // Clear reset token
    user.tokenExpiration = undefined; // Clear token expiration
    await user.save();

    res.status(200).json({ message: "Password successfully reset." });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again." });
  }
};
