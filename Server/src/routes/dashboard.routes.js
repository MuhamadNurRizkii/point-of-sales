import express from "express";
import authMiddleware from "../middleware/auth.js";

const Dashboard = express.Router();

Dashboard.use(authMiddleware());

Dashboard.get("/dashboard");

export { Dashboard };
