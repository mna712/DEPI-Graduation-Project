import express from "express";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import { addFavourite } from "../controllers/favourites/add.js";
import { protect } from "../middlewares/auth.js";
import { removeFavourite } from "../controllers/favourites/remove.js";
import { getFavouriteProducts } from "../controllers/favourites/getAll.js";
const Router =express.Router();

Router.post("/",protect, asyncWrapper(addFavourite)); 
Router.get("/:userId",protect, asyncWrapper(getFavouriteProducts));
Router.delete("/:productId",protect, asyncWrapper(removeFavourite));
Router.get("/",protect, asyncWrapper(getFavouriteProducts));

export default Router;