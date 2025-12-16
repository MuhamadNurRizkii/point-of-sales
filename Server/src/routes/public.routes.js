import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/public.controllers";

const Public = express.Router();

// LOGIN
Public.post("auth/login", loginController);
// REGISTER
Public.post("auth/login", registerController);

export default Public;
