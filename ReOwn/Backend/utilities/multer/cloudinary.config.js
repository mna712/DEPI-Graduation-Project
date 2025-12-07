import { v2 as cloudinary } from "cloudinary";
import path from "node:path"
import * as dotenv from "dotenv"
dotenv.config({path:path.resolve("./.env")})
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export default  cloudinary;
