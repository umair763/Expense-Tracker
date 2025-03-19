// server/middleware/auth.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // Ensure it matches

const authenticator = (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1]; // Extract token from the Authorization header
	if (!token) {
		return res.status(403).json({ message: "Access denied. No token provided." });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
		req.userId = decoded.userId; // Add the userId from the token to the request
		next(); // Proceed to the next middleware/route handler
	} catch (error) {
		return res.status(400).json({ message: "Invalid token." });
	}
};

export default authenticator;
