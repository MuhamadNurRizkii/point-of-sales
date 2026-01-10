import express from "express";
import cors from "cors";
import Public from "./routes/public.routes.js";
import morgan from "morgan";
import Product from "./routes/product.routes.js";
import Transaction from "./routes/transaction.routes.js";
import { Dashboard } from "./routes/dashboard.routes.js";
import { Report } from "./routes/report.routes.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/auth", Public);
app.use("/api", Dashboard);
app.use("/api", Product);
app.use("/api", Transaction);
app.use("/api", Report);

export default app;
