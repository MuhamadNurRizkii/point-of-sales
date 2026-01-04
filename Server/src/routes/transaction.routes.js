import express from "express";
import { createTransactionController } from "../controllers/transactions.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const Transaction = express.Router();

Transaction.use(authMiddleware);

// create Transaction
Transaction.post("/dashboard/transaction/add", createTransactionController);

export default Transaction;
