import express from "express";
import {
  addProductController,
  deleteProductById,
  editProductById,
  getAllProducts,
  getProductById,
} from "../controllers/products.controller.js";
import { upload } from "../middleware/multer.js";
import { authMiddleware } from "../middleware/auth.js";
import { authorize } from "../middleware/authorization.js";

const Product = express.Router();

Product.use(authMiddleware);

// create new Product
Product.post(
  "/dashboard/products/add",
  authorize("admin"),
  upload.single("image"),
  addProductController
);
// get all products
Product.get(
  "/dashboard/products",
  authorize("admin", "cashier"),
  getAllProducts
);
// get product by id
Product.get("/dashboard/products/:id", authorize("admin"), getProductById);
// edit product by id
Product.put(
  "/dashboard/products/edit/:id",
  authorize("admin"),
  upload.single("image"),
  editProductById
);

// delet product by id
Product.delete(
  "/dashboard/products/delete/:id",
  authorize("admin"),
  deleteProductById
);

export default Product;
