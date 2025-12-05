import express from "express";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import { signup } from "../controllers/users/signUp.js";
import { login } from "../controllers/users/login.js";
const Router = express.Router();
Router.post("/signup", asyncWrapper(signup));
Router.post("/login", asyncWrapper(login));
Router.post("/profile",asyncWrapper())
export default Router;