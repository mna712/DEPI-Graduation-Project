import mongoose from "mongoose";

let isConnected = false;

const dbConnect = async () => {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(process.env.DB_URL);
    isConnected = conn.connections[0].readyState === 1;
    console.log("DB connected successfully");
  } catch (err) {
    console.log("DB Error:", err.message);
  }
};

export default dbConnect;
