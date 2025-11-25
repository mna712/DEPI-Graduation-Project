import express from "express";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import addProduct from "../controllers/products/add.js";
import { protect } from "../middlewares/auth.js";
const Router = express.Router();
Router.post("/",protect, asyncWrapper(addProduct));
export default Router;