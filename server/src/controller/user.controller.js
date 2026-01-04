import bcrypt from "bcryptjs";
import validator from "validator";
import User from "../model/user.model.js";
import { generateToken } from "../lib/GenrateToken.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const register = async (req, res) => {
  try {
    const { name, email, password, phoneNumber,role } = req.body;

    if (!name || !email || !password || !phoneNumber || !role) {
      return res.status(400).json({ success: false, message: "All fields are required",}); }

  
    if (!validator.isEmail(email))
       { return res.status(400).json({ success: false, message: "Invalid email" }); }

    if (!validator.isMobilePhone(phoneNumber)) 
      {  return res.status(400).json({ success: false, message: "Invalid phone number" }); }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password too short" });
    }

    
    const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }],});

    if (existingUser) 
      { return res.status(400).json({success: false, message: "User already exists",});
    }

    // 🔹 hash & create
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
      role:  role||"game_player"  // 🔐 always backend controlled
    });

    generateToken(res, user._id);

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
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "User registration failed",
      error: err.message,
    });
  }
};





// phone normalize helper
const normalizePhone = (phone) => {
  const str = String(phone); // 🔥 safety
  let p = str.replace(/\D/g, "");
  if (p.startsWith("0")) p = p.slice(1);
  if (p.length === 10) return "+91" + p;
  if (p.startsWith("91")) return "+" + p;
  return "+" + p;
};

export const login = async (req, res) => {
  try {
    let { emailOrPhone, email, password } = req.body;

    const identifier = emailOrPhone || email;

    if (!identifier || !password) {
      return res.status(400).json({
        message: "Email/Phone and password required",
      });
    }

    const cleanValue = String(identifier).trim();
    const isEmail = cleanValue.includes("@");

    const query = isEmail
      ? { email: cleanValue.toLowerCase() }
      : { phoneNumber: normalizePhone(cleanValue) };

    const user = await User.findOne(query).select("+password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(res, user._id);

    return res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
      
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ message: "Internal server error" });
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
    const { idToken } = req.body;
    if (!idToken)
      return res.status(400).json({ message: "idToken missing" });

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email.toLowerCase();
    const name = payload.name || "Google User";

    const user = await User.findOne({ email });

    // ✅ Existing & complete user → direct login
    if (user && user.phoneNumber && user.role) {
      generateToken(res, user._id);
      return res.json({
        pending: false,
        user,
      });
    }

    // ✅ Existing but incomplete OR brand new user
    return res.json({
      pending: true,
      user: { email, name }, // 🔥 SAME KEY EVERY TIME
    });

  } catch (err) {
    return res.status(500).json({ message: "Google login failed" });
  }
};

















