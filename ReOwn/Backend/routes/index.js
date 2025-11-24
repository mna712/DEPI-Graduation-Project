import express from "express";
const Router = express.Router();
import userRouter from "./userRoutes.js";
Router.use("/user", userRouter);
export default Router;