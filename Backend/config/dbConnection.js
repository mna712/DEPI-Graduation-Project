import mongoose from "mongoose";

 const dbConnect = () => {
  return new Promise((res, rej) => {
    mongoose
      .connect(process.env.DB_URL)
      .then(() => {
        res("DB connected successfully");
      })
      .catch((err) => {
        console.log(err);
        rej(err);
      });
  });
};
export default dbConnect;