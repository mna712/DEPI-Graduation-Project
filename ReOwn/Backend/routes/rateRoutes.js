import express from "express";
import { protect } from "../middlewares/auth.js";
import { addRate } from "../controllers/rate/add.js";
import { getUserRatings } from "../controllers/rate/get.js";

const Router = express.Router();

Router.post("/:profileId", protect, addRate); 
Router.get("/:profileId", protect, getUserRatings); 

export default Router;
