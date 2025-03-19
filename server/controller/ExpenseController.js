// ExpenseController.js (Debugging Logs)
import Expense from "../model/ExpenseModel.js";
import User from "../model/UserModel.js";

// Add new expense
export const addExpense = async (req, res) => {
  try {
    // Extract the expense details from the request body
    const { category, item, amount, recordedDate } = req.body;
    
    // Get userId from the decoded JWT token
    const userId = req.userId; // This comes from the verifyToken middleware

    // Validate the required fields
    if (!category || !item || !amount || !recordedDate) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create the new expense
    const newExpense = new Expense({
      category,
      item,
      amount,
      recordedDate,
      userId, // Set userId to the extracted userId
    });

    // Save the expense to the database
    await newExpense.save();

    // Return a success response
    res.status(201).json({ message: "Expense added successfully.", expense: newExpense });
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ message: "Error adding expense." });
  }
};

// Get all expenses for a user
export const getUserExpenses = async (req, res) => {
	const userId = req.user;

	try {
		const expenses = await Expense.find({ userId });
		res.status(200).json(expenses);
	} catch (error) {
		console.error("Error fetching expenses:", error);
		res.status(500).json({ error: "Failed to fetch expenses" });
	}
};

// Get a specific expense
export const getExpenseById = async (req, res) => {
	const { id } = req.params;
	const userId = req.user;

	try {
		const expense = await Expense.findOne({ _id: id, userId });

		if (!expense) {
			return res.status(404).json({ message: "Expense not found" });
		}

		res.status(200).json(expense);
	} catch (error) {
		console.error("Error fetching expense:", error);
		res.status(500).json({ error: "Failed to fetch expense" });
	}
};
