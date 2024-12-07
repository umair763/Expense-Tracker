// server/routes/UserRoutes.js
const express = require("express");
const { registerUser, loginUser, googleSignIn } = require("../controller/UserController");

const router = express.Router();

router.post("/google-signin", googleSignIn); // Google Sign-In API
router.post("/register", registerUser);
router.post("/login", loginUser); // User login

module.exports = router;
