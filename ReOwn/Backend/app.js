import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import dbConnect from "./config/dbConnection.js";
import Router from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5174'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", Router);

dbConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running on port", PORT);
      console.log(`API available at http://localhost:${PORT}/api`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    console.log("Server will still start but database operations will fail");
    app.listen(PORT, () => {
      console.log("Server running on port", PORT, "(without database)");
    });
  });
