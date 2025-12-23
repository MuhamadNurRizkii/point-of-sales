import express from "express";
import cors from "cors";
import Public from "./routes/public.routes.js";
import morgan from "morgan";
import Product from "./routes/product.routes.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/auth", Public);
app.use("/api", Product);

export default app;
