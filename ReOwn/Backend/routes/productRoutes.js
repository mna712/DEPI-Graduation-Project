import express from "express";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import { addProduct } from "../controllers/products/add.js";
import { protect } from "../middlewares/auth.js";
import upload from "../config/multer.js";
import { deleteProduct } from "../controllers/products/delete.js";
import upload from "../config/multer.js"; 
import { updateProduct } from "../controllers/products/update.js";

const Router = express.Router();
Router.post("/", protect, upload.array("images", 5),asyncWrapper(addProduct));
Router.delete("/:id",protect,asyncWrapper(deleteProduct))
Router.put("/:id",protect, upload.array("images", 6),asyncWrapper(updateProduct))
export default Router;
