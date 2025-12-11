import mongoose from "mongoose";

const dbConnect = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log("DB already connected");
    return;
  }

  try {
    const dbUrl = process.env.DB_URL;
    if (!dbUrl) {
      console.log("⚠️  DB_URL not found in .env file. Server will run without database.");
      throw new Error("DB_URL not configured");
    }
    const conn = await mongoose.connect(dbUrl);
    console.log("✅ DB connected successfully");
    return conn;
  } catch (err) {
    console.log("❌ DB Error:", err.message);
    throw err;
  }
};

export default dbConnect;
