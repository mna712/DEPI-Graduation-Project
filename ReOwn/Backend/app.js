import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import dbConnect from "./config/dbConnection.js";
import Router from "./routes/index.js";

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", Router);

dbConnect()
  .then(() => {
    app.listen(PORT, () => console.log("Server running on", PORT));
  })
  .catch(console.log);
