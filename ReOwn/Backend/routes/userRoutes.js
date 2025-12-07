import express from "express";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import { signup } from "../controllers/users/signup.js"; 
import { login } from "../controllers/users/login.js";
const Router = express.Router();
Router.post("/signup", asyncWrapper(signup));
Router.post("/login", asyncWrapper(login));
Router.get("/profile",asyncWrapper())
export default Router;