import express from "express";

import { getDataController } from "../controllers/dashboard.controller.js";
import { authMiddleware } from "../middleware/auth.js";
import { authorize } from "../middleware/authorization.js";

const Dashboard = express.Router();

Dashboard.use(authMiddleware);

Dashboard.get("/dashboard", authorize("admin", "cashier"), getDataController);

export { Dashboard };
