import express from "express";
import {
  addProductController,
  editProductById,
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
// edit product by id
Product.put(
  "/dashboard/products/edit/:id",
  upload.single("image"),
  editProductById
);

export default Product;
