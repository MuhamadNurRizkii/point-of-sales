import express from "express";
import {
  addProductController,
  deleteProductById,
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

// delet product by id
Product.delete("/dashboard/products/delete/:id", deleteProductById);

export default Product;
