// server/index.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const userRoutes = require("./routes/UserRoutes");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// app.use(cors({ origin: "http://localhost:5000" })); // Update frontend URL if necessary
// app.use(cors({ origin: "http://localhost:5173" }));

// Database Connection
mongoose
	.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/users", userRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
