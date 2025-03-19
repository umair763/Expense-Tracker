import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	image: { type: Buffer }, // Store image as Buffer in MongoDB
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

export default User;
