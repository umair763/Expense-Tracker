// server/models/UserModels.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	image: { type: String }, // Changed from Buffer to handle Base64 strings
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
