import express from "express";
import { addExpense, getExpenses, getExpenseById } from "../controller/ExpenseController.js";
import authenticator from "../middleware/auth.js";

const router = express.Router();

// Route to add an expense (POST)
router.post("/add", authenticator, addExpense);

// Route for fetching expenses
router.get("/", authenticator, getExpenses);

// Route to get an expense by ID (GET)
router.get("/:id", authenticator, getExpenseById);

export default router;
