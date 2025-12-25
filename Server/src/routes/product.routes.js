import express from "express";
import {
  addProductController,
  getAllProducts,
  getProductById,
} from "../controllers/products.controller.js";
import { upload } from "../middleware/multer.js";

const Product = express.Router();

// create new Product
Product.post(
  "/dashboard/products/add",
  upload.single("image"),
  addProductController
);
// get all products
Product.get("/dashboard/products", getAllProducts);
// get product by id
Product.get("/dashboard/products/:id", getProductById);

export default Product;
