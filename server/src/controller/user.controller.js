import bcrypt from "bcryptjs";
import validator from "validator";
import User from "../model/user.model.js";
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
    if (!validator.isMobilePhone(phone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number",
      });
    }

    // ✅ Strong password validation
    if (
      !validator.isStrongPassword(password, {
        minLength: 6,
   
      })
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain Uppercase, Lowercase and Number.",
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
    generateToken(res, user._id);


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

   generateToken(res, user._id);

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

export const checkauth = (req, res) => {
  res.status(200).json({ success: true, message: "User is authenticated", user: req.user });
};



export const googleSignup = async (req, res) => {
  try {
    const {
      name = "Google User",
      email,
      phoneNumber,
      role,
      password,
    } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email not received from Google",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    let user = await User.findOne({ email: normalizedEmail });

 
 // CREATE GOOGLE USER (PENDING)

    if (!user) {
      user = await User.create({
        name,
        email: normalizedEmail,
        authProvider: "google",
        role: "game_player", 
      });

      generateToken(res, user._id);

      return res.status(200).json({
        success: true,
        pending: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
        message: "Additional info required",
      });
    }

  
    // COMPLETE GOOGLE SIGNUP
   
    if (!user.password && password) {
      user.password = await bcrypt.hash(password, 10);
    }

    if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }

    if (role && user.role !== role) {
      user.role = role;
    }

    await user.save();


    //  LOGIN
    
    generateToken(res, user._id);

    return res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber || "",
        role: user.role,
      },
      message: "User logged in successfully",
    });

  } catch (error) {
    console.error("Google Signup Error:", error);
    return res.status(500).json({
      success: false,
      message: "User login failed",
    });
  }
};










