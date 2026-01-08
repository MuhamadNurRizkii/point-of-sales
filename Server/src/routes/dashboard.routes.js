import express from "express";

import { getDataController } from "../controllers/dashboard.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const Dashboard = express.Router();

Dashboard.use(authMiddleware);

Dashboard.get("/dashboard", getDataController);

export { Dashboard };
