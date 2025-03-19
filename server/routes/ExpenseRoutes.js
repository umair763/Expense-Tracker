import express from "express";
import { addExpense, getUserExpenses, getExpenseById } from "../controller/ExpenseController.js";
import authenticator  from "../middleware/auth.js";

const router = express.Router();

router.post("/add", authenticator, addExpense);
router.get("/", authenticator, getUserExpenses);
router.get("/:id", authenticator, getExpenseById);

export default router;
