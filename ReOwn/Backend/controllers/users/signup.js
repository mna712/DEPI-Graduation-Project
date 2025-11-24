import { User } from "../../models/userModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";
import bcrypt from "bcryptjs";
import validator from "validator";

export const signup = async (req, res) => {
    const { firstName, lastName, email, password, phone } = req.body;


    if (!firstName || !lastName || !email || !password || !phone) {
      return res.status(400).json({
        success: FAIL,
        status: 400,
        message: "All fields are required",
      });
    }


    if (firstName.length < 3 || firstName.length > 15) {
      return res.status(400).json({
        success: FAIL,
        status: 400,
        message: "First name must be 3–15 characters",
      });
    }

    if (lastName.length < 3 || lastName.length > 15) {
      return res.status(400).json({
        success: FAIL,
        status: 400,
        message: "Last name must be 3–15 characters",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: FAIL,
        status: 400,
        message: "Invalid email format",
      });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        success: FAIL,
        status: 400,
        message: "Password is not strong",
      });
    }


    if (phone.length < 8 || phone.length > 15) {
      return res.status(400).json({
        success: FAIL,
        status: 400,
        message: "Phone number must be 8–15 digits",
      });
    }


    const olduser = await User.findOne({ email: email.toLowerCase() });
    if (olduser) {
      return res.status(400).json({
        status: 400,
        success: FAIL,
        message: "User already exists",
      });
    }


    const hashedpassword = await bcrypt.hash(password, 10);


    const newUser = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashedpassword,
      phone,
      role: "user",
    });

    await newUser.save();

    return res.status(201).json({
      status: 201,
      success: SUCCESS,
      message: "User created successfully",
    });

};
