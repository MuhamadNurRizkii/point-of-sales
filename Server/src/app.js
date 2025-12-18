import express from "express";
import cors from "cors";
import Public from "./routes/public.routes.js";
import morgan from "morgan";
import User from "./routes/user.routes.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/auth", Public);
app.use("/api", User);

export default app;
