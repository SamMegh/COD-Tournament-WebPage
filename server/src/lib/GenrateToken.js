import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_ADMIN_SECRET = process.env.JWT_SECRET1;

console.log("JWT_SECRET:", JWT_SECRET);
console.log("JWT_ADMIN_SECRET:", JWT_ADMIN_SECRET);

// USER TOKEN
export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// ADMIN TOKEN
export const generateAdminToken = (email) => {
  try {
    return jwt.sign({ email }, JWT_ADMIN_SECRET, { expiresIn: "7d" });
  } catch (error) {
    console.error("Admin token generation error");
    return null;
  }
};

export const verifyAdminToken = (token) => {
  try {
    return jwt.verify(token, JWT_ADMIN_SECRET);
  } catch (error) {
    return null;
  }
};
