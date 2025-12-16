import bcrypt from "bcryptjs";
import validator from "validator";
import User from "../modules/UserAuthSchema.js";
import { generateToken } from "../lib/GenrateToken.js";



export const register = async (req, res) => {
  try {
    // ✅ Frontend se aane wale exact fields
    const { name, email, password, phone, role } = req.body;

    // ✅ Empty check
    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ✅ Email validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    // ✅ Indian phone validation
    if (!validator.isMobilePhone(phone, "en-IN")) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number",
      });
    }

    // ✅ Strong password validation
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain uppercase, lowercase, number & symbol",
      });
    }

    // ✅ Existing user check
    const existingUser = await User.findOne({
      $or: [{ email }, { phoneNumber: phone }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create user
    const user = await User.create({
      name,
      email,
      phoneNumber: phone, // DB me phoneNumber
      password: hashedPassword,
      role: role || "game_player",
    });

    // ✅ Generate token
    const token = generateToken(user);

    // ✅ Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax", // localhost ke liye best
      maxAge: 24 * 60 * 60 * 1000,
    });

    // ✅ Success response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User registration failed",
      error: error.message,
    });
  }
};



export const login = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body; // frontend se email ya phone bheje

    if (!emailOrPhone || !password) {
      return res.status(400).json({ success: false, message: "Email/Phone and password required" });
    }

    // Email OR Phone se user dhundo
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }]
    }).select("+password"); // ✅ password select

    if (!user) {
      return res.status(400).json({ success: false, message: "User does not exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({ 
      success: true, 
      message: "User logged in successfully",   
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "User login failed", error: error.message });
  }
};


export const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0)
    });

    res.status(200).json({ success: true, message: "User logged out successfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: "User logout failed", error: error.message });
  }
};

