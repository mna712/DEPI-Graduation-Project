import express from "express";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import { addProduct } from "../controllers/products/add.js";
import { protect } from "../middlewares/auth.js";
import { deleteProduct } from "../controllers/products/delete.js";
import { updateProduct } from "../controllers/products/update.js";
import { getAllProducts } from "../controllers/products/getAll.js";
import { getProduct } from "../controllers/products/getOne.js";
import { uploadCloudFile, filevalidation } from "../utilities/multer/cloud.multer.js";
const Router = express.Router();
Router.post(
  "/",
  protect,
  uploadCloudFile(filevalidation.images).array("images", 6),
  asyncWrapper(addProduct)
);
Router.get("/", protect, asyncWrapper(getAllProducts));
Router.get("/:id", protect, asyncWrapper(getProduct));
Router.delete("/:id", protect, asyncWrapper(deleteProduct));
Router.put(
  "/:id",
  protect,
  uploadCloudFile(filevalidation.images).array("images", 6),
  asyncWrapper(updateProduct)
);
export default Router;
