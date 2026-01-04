import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const protect = async (req, res, next) => {
  const token = req.cookies.token || "";
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authentication token is missing",
    });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    return res.status(401).json({
      success: false,
      message: "Invalid authentication token",
    });
  }
  const user = await User.findById(decoded.id).select("-password");
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "User not found",
    });
  }
  req.user = user;
  next();
};


export const isManager = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  if (req.user.role !== "tournament_manager") {
    return res.status(403).json({
      success: false,
      message: "Access denied: Manager only",
    });
  }

  next();
};
