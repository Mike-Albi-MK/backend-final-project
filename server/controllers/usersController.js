import createError from "http-errors";
import jwt from "jsonwebtoken";

import { createSendToken } from "../libs/jwt.js";
import User from "../models/User.js";

//! SIGNUP a new user
export const signup = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        createSendToken(res, 201, user);
    } catch (error) {
        next(error);
    }
};

//! LOGIN a new user
export const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

         //! Check if both username and password are provided
        if (!username || !password) {
            throw createError(400, "Please provide username and password");
        }

        //! Explicitly select the password (excluded by default in the schema)
        const user = await User.findOne({ username }).select("+password");

        //! If the user doesn't exist or the password is incorrect
        if (!user || !(await user.isPasswordCorrect(password, user.password))) {
            throw createError(401, "Incorrect username or password");
        }

         //! Create and send JWT token
            createSendToken(res, 201, user);
    } catch (error) {
        next(error);
    }
};

//! LOGOUT an user
export const logout = async (req, res, next) => {
    try {
      //! JWT cookie gets cleared and secured
        res.clearCookie("jwtToken", {
            httpOnly: true, // Cookie cannot be accessed by JavaScript
            secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
            sameSite: "Strict" // Prevent CSRF attacks
        });

        res.status(200).json({
            success: true,
            status: 200,
            data: "User was successfully logged out",
        })
    } catch (error) {
        next(error);
    }
};

//! Protect routes – logged-in users only
export const protect = async (req, res, next) => {
    try {
      //! Get token from cookies
      const jwtToken = req.cookies["jwtToken"];
  
      if (!jwtToken) throw createError(401, "Unauthorized request");
  
       //! Verify token and decode it
      const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
  
      //! Find user by decoded ID and attach to request object
      const user = await User.findById(decoded.id);
  
      if (!user) throw createError(401, "User is no longer exist");
  
      req.user = user;
      req.isAuthenticated = true;
  
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
          next(createError(401, "Token expired, login again"));
      } else {
          next(error);
      }
  }
  };
  
  //! GET logged-in user's profile
  export const getMe = (req, res, next) => {
    const { user, isAuthenticated } = req;
  
    res.status(200).json({
      success: true,
      user,
      isAuthenticated,
    });
  };

//! Updating user profile (including password)
export const updateUser = async (req, res, next) => {
    try {
      const { password, ...rest } = req.body;
      const { id } = req.params;
  
      //! If the password is provided, hash it
      if (password) {
        rest.password = await bcrypt.hash(password, 12);
    }
      const updatedUser = await User.findByIdAndUpdate(id, rest, { 
        new: true,
        runValidators: true,
       });

       if (!updatedUser) {
        return next(createError(404, "User not found"));
    }

      res.status(200).json({ message: "Update success", data: updatedUser });
    } catch (error) {
      next(error);
    }
  };