// Backend/routes/authRoutes.js

const express = require("express");
const { forgotPassword, resetPassword } = require("../controllers/authController");

const router = express.Router();

// Route to initiate the password reset process
router.post("/forgot-password", forgotPassword);

// Route to reset the password using a token
router.post("/reset-password", resetPassword);

module.exports = router;
