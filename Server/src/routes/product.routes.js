import express from "express";
import {
  addProductController,
  getAllProducts,
} from "../controllers/products.controller.js";
import { upload } from "../middleware/multer.js";

const Product = express.Router();

// create new Product
Product.post(
  "/dashboard/products/add",
  upload.single("image"),
  addProductController
);

Product.get("/dashboard/products", getAllProducts);

export default Product;
