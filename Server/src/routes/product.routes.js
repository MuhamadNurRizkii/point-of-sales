import express from "express";

const Product = express.Router();

// create new Product
Product.post("/dashboard/products/add");

export default Product;
