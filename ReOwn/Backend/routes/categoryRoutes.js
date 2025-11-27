import express from "express";
import { getAllCategories } from "../controllers/categories/getAllCategories.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import { addCategory } from "../controllers/categories/add.js";
import { protect } from "../middlewares/auth.js";
import { getAllProducts } from "../controllers/categories/getCategoryProducts.js";
import { getAllCategoriesWithItsProducts } from "../controllers/categories/getAllCategoriesWithProducts.js";
import { removeCategory } from "../controllers/categories/remove.js";
import { upload } from "../middlewares/upload.js";

const Router = express.Router();

Router.post(
  "/",
  protect,
  upload.single("image"),
  asyncWrapper(addCategory)
);

Router.get("/", asyncWrapper(getAllCategories));
Router.get("/:categoryId", asyncWrapper(getAllProducts));
Router.delete("/:categoryId", protect, asyncWrapper(removeCategory));
Router.get("/products", protect, asyncWrapper(getAllCategoriesWithItsProducts));
//GET  /category/:categoryId/products

export default Router;
