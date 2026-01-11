import express from "express";
import {
  createTransactionController,
  getAllTransactionController,
  getDetailTransaction,
} from "../controllers/transactions.controller.js";
import { authMiddleware } from "../middleware/auth.js";
import { authorize } from "../middleware/authorization.js";

const Transaction = express.Router();

Transaction.use(authMiddleware);

// create Transaction
Transaction.post(
  "/dashboard/transaction/add",
  authorize("admin", "cashier"),
  createTransactionController
);
// get transaction data
Transaction.get(
  "/dashboard/transactions",
  authorize("admin", "cashier"),
  getAllTransactionController
);
// get detail transaction
Transaction.get(
  "/dashboard/transactions/detail/:id",
  authorize("admin", "cashier"),
  getDetailTransaction
);

export default Transaction;
