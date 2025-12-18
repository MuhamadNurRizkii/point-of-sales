import express from "express";

const User = express.Router();

// create new Product
User.post("/dashboard/products/add");

export default User;
