import express from "express";
const Router = express.Router();
import userRouter from "./userRoutes.js";
import productRouter from "./productRoutes.js"
Router.use("/user", userRouter);
Router.use("/product", productRouter);
export default Router;