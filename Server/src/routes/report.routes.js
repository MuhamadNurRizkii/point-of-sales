import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  getDataReportController,
  chartReport,
} from "../controllers/report.controller.js";
import app from "../app.js";
import { authorize } from "../middleware/authorization.js";

const Report = express.Router();

Report.use(authMiddleware);

Report.get("/dashboard/report", authorize("admin"), getDataReportController);
Report.get("/dashboard/report/chart", authorize("admin"), chartReport);

export { Report };
