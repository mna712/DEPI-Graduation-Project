import express from "express";
const Router = express.Router();
import userRouter from "./userRoutes.js";
import productRouter from "./productRoutes.js"
import favRouter from "./favRoutes.js"
import categoryRoutes from "./categoryRoutes.js"
Router.use("/user", userRouter);
Router.use("/category",categoryRoutes)
Router.use("/product", productRouter);
Router.use("/favourite",favRouter)
export default Router;