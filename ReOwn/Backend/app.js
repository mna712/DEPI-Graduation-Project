import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import dbConnect from "./config/dbConnection.js";
import Router from "./routes/index.js";

const app = express();
const PORT = process.env.PORT;
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5174/"],
    credentials: true,
  })
);app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api", Router);

export default app;
