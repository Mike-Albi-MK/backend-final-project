import createError from "http-errors";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    // Retrieve JWT token from cookies
    const jwtToken = req.cookies["jwtToken"];

    if (!jwtToken) {
      return next(createError(401, "Authentication required. Please log in."));
    }

    // Verify the token
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

    // Find the user from the decoded token
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(createError(401, "User no longer exists. Please register again."));
    }

    // Attach user to the request object
    req.user = user;
    req.isAuthenticated = true;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(createError(401, "Session expired. Please log in again."));
    }
    next(createError(401, "Invalid token. Please log in again."));
  }
};

//! Middleware to check if user is an admin
export const admin = (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      return next();
    }
    return next(createError(403, "Access denied. Admins only."));
  } catch (error) {
    next(error);
  }
};