import express from "express";
import {
  createTransactionController,
  getAllTransactionController,
} from "../controllers/transactions.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const Transaction = express.Router();

Transaction.use(authMiddleware);

// create Transaction
Transaction.post("/dashboard/transaction/add", createTransactionController);
// get transaction data
Transaction.get("/dashboard/transactions", getAllTransactionController);

export default Transaction;
