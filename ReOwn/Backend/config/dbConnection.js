import mongoose from "mongoose";
let isConnected = false;
const dbConnect = async () => {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(process.env.DB_URL);
    console.log("DB connected successfully");
    isConnected = true;
  } catch (err) {
    console.log("DB Error:", err.message);
  }
};

export default dbConnect;
