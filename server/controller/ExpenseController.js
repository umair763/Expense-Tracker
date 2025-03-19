import Expense from "../model/ExpenseModel.js";

// Add new expense
export const addExpense = async (req, res) => {
	try {
		// Extract the expense details from the request body
		const { category, item, amount, recordedDate } = req.body;

		// Get userId from the decoded JWT token
		const userId = req.userId; // From the authenticator middleware

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
export const getExpenses = async (req, res) => {
	try {
		// Add debugging log to see what's being used for userId
		console.log("Fetching expenses with userId:", req.userId);

		// Change req.user to req.userId to match what's set in the authenticator
		const expenses = await Expense.find({ userId: req.userId });

		// Log the found expenses
		console.log(`Found ${expenses.length} expenses`);

		res.json(expenses);
	} catch (err) {
		console.error("Error fetching expenses:", err);
		res.status(500).json({ message: "Failed to fetch expenses", error: err.message });
	}
};

// Get a specific expense
export const getExpenseById = async (req, res) => {
	const { id } = req.params;
	// Change req.user to req.userId here as well
	const userId = req.userId;

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

export const deleteExpense = async (req, res) => {
	try {
		const { id } = req.params;

		// Change req.user to req.userId here as well
		const expense = await Expense.findOne({ _id: id, userId: req.userId });

		if (!expense) {
			return res.status(404).json({ message: "Expense not found" });
		}

		// Delete the expense
		await Expense.findByIdAndDelete(id);
		res.json({ message: "Expense deleted successfully" });
	} catch (err) {
		console.error("Error deleting expense:", err);
		res.status(500).json({ message: "Failed to delete expense", error: err.message });
	}
};
