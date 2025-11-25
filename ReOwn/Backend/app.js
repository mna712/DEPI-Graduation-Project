import express from "express";
import cors from "cors";
import dbConnect from "./config/dbConnection.js";
import Router from "./routes/index.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());

app.use("/api", Router);
dbConnect()
  .then((msg) => {
    console.log(msg);
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
