// server/controllers/UserControllers.js
const User = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { OAuth2Client } = require("google-auth-library");
const fetch = require("node-fetch");

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const oauthClient = new OAuth2Client(GOOGLE_CLIENT_ID);

// Google Sign-In Handler
exports.googleSignIn = async (req, res) => {
	const { name, email, picture } = req.body;

	// Fetch the profile image and convert it to base64
	const response = await fetch(picture);
	const imageBuffer = await response.buffer();
	const base64Picture = imageBuffer.toString("base64");

	// Check if necessary fields are provided
	if (!name || !email || !picture) {
		return res.status(400).json({ error: "Missing required fields (name, email, picture)" });
	}

	try {
		// Check if user already exists with this email
		let user = await User.findOne({ email });

		if (!user) {
			// Create a new user with Google info
			user = new User({
				name: name,
				email: email,
				password: await bcrypt.hash("tempPassword123", 10), // Temporary password
				picture: base64Picture,
			});

			// Save user to the database
			await user.save();
		}

		// Generate JWT token
		const jwtToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" });

		return res.status(200).json({
			message: "User authenticated successfully",
			token: jwtToken,
			user: {
				name: user.name,
				email: user.email,
				picture: user.picture,
			},
		});
	} catch (error) {
		console.error("Error during Google sign-in:", error);
		return res.status(500).json({ error: "Failed to authenticate user" });
	}
};

// Configure multer for image uploads
const upload = multer({
	storage: multer.memoryStorage(),
	limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max size
	fileFilter: (req, file, cb) => {
		if (!file.mimetype.startsWith("image/")) {
			return cb(new Error("Invalid file type. Only image files are allowed."), false);
		}
		cb(null, true);
	},
}).single("image"); // Ensure field name matches frontend

// Register a new user
exports.registerUser = async (req, res) => {
	upload(req, res, async (err) => {
		if (err) {
			console.error("Error uploading file:", err.message);
			return res.status(400).json({ message: err.message });
		}

		try {
			const { name, email, password } = req.body;

			// Validate required fields
			if (!name || !email || !password) {
				return res.status(400).json({ message: "Email, name, and password are required." });
			}

			// Check if the email is already used
			const existingUser = await User.findOne({ email });
			if (existingUser) {
				return res.status(400).json({ message: "Email already in use." });
			}

			// Hash the password
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);

			let base64Image = null;
			if (req.file) {
				// If an image file is uploaded, convert to base64
				base64Image = req.file.buffer.toString("base64");
			}

			// Create new user
			const newUser = new User({
				name,
				email,
				password: hashedPassword,
				image: base64Image, // Store the base64 image in the database
			});

			await newUser.save();

			return res.status(201).json({ message: "User registered successfully." });
		} catch (error) {
			console.error("Registration error:", error.message);
			return res.status(500).json({ message: "Server error. Please try again." });
		}
	});
};

// Login user
exports.loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ message: "Invalid email or password" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ message: "Invalid email or password" });
		}

		const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

		res.status(200).json({
			token,
			user: { id: user._id, name: user.name, email: user.email },
		});
	} catch (error) {
		console.error("Error during login:", error);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
