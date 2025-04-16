import Transaction from "../model/TransactionModel.js";
import mongoose from "mongoose";

// Get all transactions with pagination
export const getTransactions = async (req, res) => {
	try {
		// Get the authenticated user's ID from the request
		const userId = req.userId;
		console.log("Fetching transactions for userId:", userId);

		// Debug: Check the type of userId (should be a valid MongoDB ObjectId)
		console.log("Type of userId:", typeof userId);
		console.log("userId value:", userId);

		const page = Number.parseInt(req.query.page) || 1;
		const limit = Number.parseInt(req.query.limit) || 10;

		// Debug: Log the query we're about to run
		console.log("Running query: Transaction.find({ userId:", userId, "})");

		// Filter transactions by userId
		const transactions = await Transaction.find({ userId: mongoose.Types.ObjectId(userId) })
			.skip((page - 1) * limit)
			.limit(limit);

		// Debug: Log raw transaction data
		console.log("Raw transaction data:", JSON.stringify(transactions, null, 2));

		// Count only the logged-in user's transactions
		const totalTransactions = await Transaction.countDocuments({ userId: mongoose.Types.ObjectId(userId) });
		const totalPages = Math.ceil(totalTransactions / limit);

		console.log(`Found ${transactions.length} transactions for user out of ${totalTransactions} total`);
		res.status(200).json({
			transactions,
			totalPages,
			currentPage: page,
			totalTransactions,
		});
	} catch (error) {
		console.error("Error in getTransactions:", error);
		res.status(500).json({ message: "Server error" });
	}
};

// Create a new transaction
export const createTransaction = async (req, res) => {
	try {
		// Get the authenticated user's ID from the request
		const userId = req.userId;
		console.log("Creating transaction for userId:", userId);

		// Debug: Check the incoming request body
		console.log("Request body:", req.body);

		// Add the userId to the transaction data
		const transactionData = {
			...req.body,
			userId: mongoose.Types.ObjectId(userId),
		};

		// Debug: Log the transaction data we're about to save
		console.log("Saving transaction with data:", transactionData);

		const newTransaction = new Transaction(transactionData);

		// Debug: Check if the transaction is valid
		const validationError = newTransaction.validateSync();
		if (validationError) {
			console.error("Validation error:", validationError);
			return res.status(400).json({
				message: "Validation failed",
				errors: validationError.errors,
			});
		}

		await newTransaction.save();

		console.log("Transaction created successfully:", newTransaction._id);
		res.status(201).json({
			message: "Transaction created successfully",
			transaction: newTransaction,
		});
	} catch (error) {
		console.error("Error creating transaction:", error);
		// Send more details about the error to help troubleshoot
		res.status(500).json({
			message: "Failed to create transaction",
			error: error.message,
			stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
		});
	}
};
