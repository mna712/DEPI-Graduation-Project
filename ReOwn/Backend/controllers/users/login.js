import { User } from "../../models/userModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";
import bcrypt from "bcryptjs";
import generateToken from "../../utilities/generateJWT.js";
import validator from "validator";

export const login = async (req, res) => {
    const { email, password } = req.body;


    if (!email || !password) {
      return res.status(400).json({
        status: 400,
        success: FAIL,
        message: "Email and password are required",
      });
    }


    if (!validator.isEmail(email)) {
      return res.status(400).json({
        status: 400,
        success: FAIL,
        message: "Invalid email format",
      });
    }



    const user = await User.findOne({ email: email.toLowerCase(), deleted_at: null });
    if (!user) {
      return res.status(404).json({
        status: 404,
        success: FAIL,
        message: "User not found",
      });
    }


    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword) {
      return res.status(401).json({
        status: 401,
        success: FAIL,
        message: "Invalid password",
      });
    }

    const token = await generateToken({ id: user._id, role: user.role });
  console.log("token",token);
    return res.status(200).json({
      status: 200,
      success: SUCCESS,
      message: "Login succeeded",
      data: {
        token,
        role: user.role,
        userId: user._id,
      },
    });
};
