import express from "express";
import {
  createTransactionController,
  getAllTransactionController,
  getDetailTransaction,
} from "../controllers/transactions.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const Transaction = express.Router();

Transaction.use(authMiddleware);

// create Transaction
Transaction.post("/dashboard/transaction/add", createTransactionController);
// get transaction data
Transaction.get("/dashboard/transactions", getAllTransactionController);
// get detail transaction
Transaction.get("/dashboard/transactions/detail/:id", getDetailTransaction);

export default Transaction;
