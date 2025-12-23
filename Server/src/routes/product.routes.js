import express from "express";
import { addProductController } from "../controllers/products.controller.js";
import { upload } from "../middleware/multer.js";

const Product = express.Router();

// create new Product
Product.post(
  "/dashboard/products/add",
  upload.single("image"),
  addProductController
);

export default Product;
