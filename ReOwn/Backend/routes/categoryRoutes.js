import express from "express";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import { add } from "../controllers/categories/add.js";
import { protect } from "../middlewares/auth.js";
const Router = express.Router();
Router.post("/", protect,upload.array("productImages", 1), asyncWrapper(add));
export default Router;