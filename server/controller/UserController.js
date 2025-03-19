// server/controllers/UserControllers.js
import User from "../model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import { OAuth2Client } from "google-auth-library";
// Removed unused fetch import
import dotenv from "dotenv";
import axios from "axios"; // Required for fetching the profile image

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // JWT Secret from .env

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const oauthClient = new OAuth2Client(GOOGLE_CLIENT_ID);

// Function to generate JWT token
const generateToken = (userId) => {
	return jwt.sign(
		{ userId }, // Payload containing the userId
		JWT_SECRET, // Secret key from environment variables
		{ expiresIn: "7d" } // Token expiration time (7 days)
	);
};

// Google Sign-In Handler
export const googleSignIn = async (req, res) => {
	try {
		const { token } = req.body;
		if (!token) return res.status(400).json({ message: "Google token is required" });

		// Verify Google Token
		const ticket = await oauthClient.verifyIdToken({
			idToken: token,
			audience: GOOGLE_CLIENT_ID,
		});

		const payload = ticket.getPayload();
		const { email, name, picture } = payload;

		// Fetch and convert Google Profile Image to Base64
		const imageResponse = await axios.get(picture, { responseType: "arraybuffer" });
		const base64Image = Buffer.from(imageResponse.data, "binary");

		// Check if user already exists
		let user = await User.findOne({ email });

		if (!user) {
			user = new User({
				name,
				email,
				image: base64Image, // Store image in MongoDB
				password: await bcrypt.hash("tempPassword123", 10), // Temporary password for Google login
			});

			await user.save();
		}

		// Generate JWT Token
		const jwtToken = generateToken(user._id);

		res.status(200).json({
			message: "Google Sign-In successful",
			token: jwtToken,
			user: { name: user.name, email: user.email, image: user.image },
		});
	} catch (error) {
		console.error("Google Sign-In Error:", error);
		res.status(500).json({ message: "Failed to authenticate user", error: error.message });
	}
};

// Configure multer for image uploads
const upload = multer({
	storage: multer.memoryStorage(),
	limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max size
	fileFilter: (_, file, cb) => {
		if (!file.mimetype.startsWith("image/")) {
			return cb(new Error("Invalid file type. Only image files are allowed."), false);
		}
		cb(null, true);
	},
}).single("image"); // Ensure field name matches frontend

// Register a new user
export const registerUser = async (req, res) => {
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

			// Generate JWT token for the new user
			const token = generateToken(newUser._id);

			return res.status(201).json({
				message: "User registered successfully.",
				token,
				user: { id: newUser._id, name: newUser.name, email: newUser.email },
			});
		} catch (error) {
			console.error("Registration error:", error.message);
			return res.status(500).json({ message: "Server error. Please try again." });
		}
	});
};

// Login user
export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		// Find user by email
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ message: "Invalid email or password" });
		}

		// Compare passwords
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ message: "Invalid email or password" });
		}

		// Generate JWT token for the user
		const token = generateToken(user._id);

		// Return the token and user data in the response
		res.status(200).json({
			token,
			user: { id: user._id, name: user.name, email: user.email },
		});
	} catch (error) {
		console.error("Error during login:", error);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
