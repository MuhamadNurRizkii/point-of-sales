import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/public.controllers.js";

const Public = express.Router();

// LOGIN
Public.post("/auth/login", loginController);
// REGISTER
Public.post("/auth/register", registerController);

export default Public;
