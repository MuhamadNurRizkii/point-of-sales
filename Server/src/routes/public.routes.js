import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/public.controllers.js";

const Public = express.Router();

// LOGIN
Public.post("/login", loginController);
// REGISTER
Public.post("/register", registerController);

export default Public;
