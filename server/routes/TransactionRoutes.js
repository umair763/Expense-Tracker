import express from "express";
import { getTransactions, createTransaction } from "../controller/TransactionController.js";
import authenticator from "../middleware/auth.js";

const router = express.Router();

// Fetch transactions
router.get("/transactions", authenticator, getTransactions);

// Create a new transaction
router.post("/transactions", authenticator, createTransaction);

export default router;
