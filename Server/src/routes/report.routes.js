import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  getDataReportController,
  chartReport,
} from "../controllers/report.controller.js";
import app from "../app.js";

const Report = express.Router();

Report.use(authMiddleware);

Report.get("/dashboard/report", getDataReportController);
Report.get("/dashboard/report/chart", chartReport);

export { Report };
