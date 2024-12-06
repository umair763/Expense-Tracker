// server/controllers/UserControllers.js
const User = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Configure multer
const upload = multer({
	storage: multer.memoryStorage(),
	limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max size
	fileFilter: (req, file, cb) => {
		if (!file.mimetype.startsWith("image/")) {
			return cb(new Error("Invalid file type. Only image files are allowed."), false);
		}
		cb(null, true);
	},
}).single("image");

// Register a new user
exports.registerUser = async (req, res) => {
	upload(req, res, async (err) => {
		if (err) {
			console.error("Error uploading file:", err.message);
			return res.status(400).json({ message: err.message });
		}

		try {
			const { email, password } = req.body;

			if (!email || !password) {
				return res.status(400).json({ message: "Email and password are required." });
			}

			const existingUser = await User.findOne({ email });
			if (existingUser) {
				return res.status(400).json({ message: "Email already in use." });
			}

			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);

			let base64Image = null;
			if (req.file) {
				base64Image = req.file.buffer.toString("base64");
			}

			const newUser = new User({
				email,
				password: hashedPassword,
				image: base64Image,
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

		// Check if user exists
		const user = await User.findOne({ email });
		if (!user) {
			console.log("User not found:", email); // Debugging
			return res.status(401).json({ message: "Invalid email or password" });
		}

		// Compare the password
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			console.log("Password mismatch for email:", email); // Debugging
			return res.status(401).json({ message: "Invalid email or password" });
		}

		// Generate a JWT
		const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

		res.status(200).json({
			token,
			user: { id: user._id, name: user.name, email: user.email },
		});
	} catch (error) {
		console.error("Error during login:", error); // Debugging
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
