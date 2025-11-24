import mongoose from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 15,
      trim: true
    },

    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15,
        trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 50,
      minlength: 10,
      validate: [
        validator.isEmail,
        {
          message: "Please provide a valid email address",
        },
      ],
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      validate: [
        validator.isStrongPassword,
        { message: "Password must be strong" },
      ],
    },

   phone :{
type: String,
required: true,
unique: true,
maxlength: 15,

   },
    address: {
      type: String,
      minlength: 5,
      maxlength: 40,
    },
    deleted_at: { type: Date, default: null },
    image:{
      type: String,
      default:
        "https://res.cloudinary.com/dweffiohi/image/upload/v1756798194/kxd3fv4kuoiozsglw1ry.jpg",
    },
rate:{
        type: Number,
},
role: {
      type: String,
      enum: ["user", "admin"]
  }},
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
