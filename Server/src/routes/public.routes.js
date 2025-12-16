import express from "express";
import { loginController } from "../controllers/public.controllers";

const Public = express.Router();

// LOGIN
Public.post("/login", loginController);
// REGISTER

export default Public;
