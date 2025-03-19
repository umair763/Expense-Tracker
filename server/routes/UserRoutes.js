import express from "express";
import { registerUser, loginUser, googleSignIn } from "../controller/UserController.js";

const router = express.Router();

router.post("/google-signin", googleSignIn);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
