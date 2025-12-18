import bcrypt from "bcryptjs";
import validator from "validator";
import User from "../model/user.model.js";
import { generateToken } from "../lib/GenrateToken.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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





// helper: phone clean
const normalizePhone = (phone) => {
  let p = phone.replace(/\D/g, ""); // sirf digits

  if (p.startsWith("0")) {
    p = p.slice(1);
  }

  if (p.length === 10) {
    return "+91" + p;
  }

  if (p.length === 12 && p.startsWith("91")) {
    return "+" + p;
  }

  if (p.length === 13 && p.startsWith("91")) {
    return "+" + p.slice(1);
  }

  return "+" + p;
};

export const login = async (req, res) => {
  try {
    let { emailOrPhone, password } = req.body;

    emailOrPhone = emailOrPhone.trim();

    const isEmail = emailOrPhone.includes("@");

    const query = isEmail
      ? { email: emailOrPhone.toLowerCase() }
      : { phoneNumber: normalizePhone(emailOrPhone) };

    const user = await User.findOne(query).select("+password");

    if (!user)
      return res.status(400).json({
        success: false,
        message: "User not found",
      });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok)
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });

    generateToken(res, user._id);

    res.json({ success: true, message: "Logged in", user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
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
    const { idToken, _id, phoneNumber, password, role } = req.body;


    if (_id) {
      if (!phoneNumber || !password || !role)
        return res.status(400).json({ success: false, message: "All fields required for pending user" });

      const user = await User.findById(_id);
      if (!user) return res.status(404).json({ success: false, message: "User not found" });

      user.phoneNumber = phoneNumber;
      user.role = role;
      user.password = await bcrypt.hash(password, 10);
      await user.save();

      generateToken(res, user._id);
      return res.status(200).json({ success: true, pending: false, user, message: "Profile completed & logged in" });
    }

    //  Google login
    if (!idToken) return res.status(400).json({ success: false, message: "idToken missing" });
   
   const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email.toLowerCase();
    const name = payload.name || "Google User";

    let user = await User.findOne({ email });

    if (!user) {
      // New pending user
      user = await User.create({ name, email, authProvider: "google" });
      return res.status(200).json({ success: true, pending: true, user, message: "Complete your profile" });
    }

    if (user.phoneNumber && user.role) {
      generateToken(res, user._id);
      return res.status(200).json({ success: true, pending: false, user, message: "Logged in successfully" });
    }

    // Existing but incomplete → pending
    return res.status(200).json({ success: true, pending: true, user, message: "Complete your profile" });

  } catch (err) {
    console.error("Google Auth Error:", err);
    return res.status(500).json({ success: false, message: "Google login failed", error: err.message });
  }
};















