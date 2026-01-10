import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { getDataReportController } from "../controllers/report.controller.js";
import app from "../app.js";

const Report = express.Router();

Report.use(authMiddleware);

Report.get("/dashboard/report", getDataReportController);

export { Report };
