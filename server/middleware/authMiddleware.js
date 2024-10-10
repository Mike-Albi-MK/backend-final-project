import createError from "http-errors";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

//! Middleware to protect routes and check if user is logged in
export const protect = async (req, res, next) => {
  try {
    const jwtToken = req.cookies["jwtToken"];
  
    if (!jwtToken) throw createError(401, "Unauthorized request");
  
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
  
    const user = await User.findById(decoded.id);
  
    if (!user) throw createError(401, "User does not exist");
  
    req.user = user;
    req.isAuthenticated = true;
  
    next();
  } catch (error) {
    next(error);
  }
};

//! Middleware to check if user is an admin
export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403);
    throw new Error("Access denied, admin only");
  }
};