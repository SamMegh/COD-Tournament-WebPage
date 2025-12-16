import { verifyToken, verifyAdminToken } from "../lib/GenrateToken.js";

/**
 * OPTIONAL AUTH
 * Token hoga to req.user attach karega
 * Token nahi hoga to next()
 */
export const checkForAuthenticationCookie = (cookieName = "token") => {
  return (req, res, next) => {
    const token = req.cookies?.[cookieName];

    if (!token) {
      return next();
    }

    const userPayload = verifyToken(token);
    if (userPayload) {
      req.user = userPayload;
    }

    next();
  };
};

/**
 * USER AUTH REQUIRED
 */
export const authRequired = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token" });
  }

  const userPayload = verifyToken(token);
  if (!userPayload) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }

  req.user = userPayload;
  next();
};

/**
 * ADMIN AUTH REQUIRED
 */
export const adminAuthRequired = (req, res, next) => {
  const token = req.cookies?.adminToken;

  if (!token) {
    return res.status(401).json({ message: "Admin token missing" });
  }

  const adminPayload = verifyAdminToken(token);
  if (!adminPayload) {
    return res.status(403).json({ message: "Invalid admin token" });
  }

  req.admin = adminPayload;
  next();
};
