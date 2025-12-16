import express from "express";
import cors from "cors";
import Public from "./routes/public.routes.js";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api", Public);

export default app;
