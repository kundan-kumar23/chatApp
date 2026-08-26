import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import { generatetoken } from "../../utils/generateToken.js";
import dotenv from "dotenv";
import { sendWelcomeEmail } from "../../emails/emailHandlers.js";
import cloudinary from "../../lib/cloudinary.js";

dotenv.config();
export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    if (!email || !fullname || !password) {
      return res.status(400).json({
        message: "all fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "password must be atleast 6 character",
      });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "email already exist" });

    const hashpassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      fullname,
      email,
      password: hashpassword,
    });

    if (newUser) {
      generatetoken(newUser, res);

      try {
        await sendWelcomeEmail(newUser.email, newUser.fullname, process.env.CLIENT_URL);
      } catch (error) {
        console.error("Failed to send welcome email:", error);
      }

       return res.status(200).json({
        sucess: true,
        message: "user register sucessfully",
        data: newUser,
      });

    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }

    
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: true,
      message: "internal server error",
    });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    generatetoken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullname,
      email: user.email,
      profilePic: user.profilepic,
    });
  } catch (error) {
    console.error("Error in login controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (_, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};



export const updateProfile = async (req, res) => {
  try {
    const profilePic  = req.file;
    console.log(profilePic)
    if (!profilePic) return res.status(400).json({ message: "Profile pic is required" });

    const userId = req.user._id;
    console.log(userId)

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};