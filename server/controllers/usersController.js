import createError from "http-errors";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const signup = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        createSendToken(res, 201, user);
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            throw createError(400, "Please provide username and password");
        }

        const user = await User.findOne({ username });

        if (!user || !(await user.isPasswordCorrect(password, user.password))) {
            throw createError(401, "Incorrect username or password");
        }

            createSendToken(res, 201, user);
    } catch (error) {
        next(error);
    }
};

export const logout = async (req, res, next) => {
    try {
        res.clearCookie("jwtToken");
        res.status(200).json({
            success: true,
            status: 200,
            data: "User was successfully logged out",
        })
    } catch (error) {
        next(error);
    }
};

export const protect = async (req, res, next) => {
    try {
      const jwtToken = req.cookies["jwtToken"];
  
      if (!jwtToken) throw createError(401, "Unauthorized request");
  
      const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
  
      const user = await User.findById(decoded.id);
  
      if (!user) throw createError(401, "User is no longer exist");
  
      req.user = user;
      req.isAuthenticated = true;
  
      console.log(req);
  
      next();
    } catch (error) {
      next(error);
    }
  };
  
  export const getMe = (req, res, next) => {
    const { user, isAuthenticated } = req;
  
    res.status(200).json({
      success: true,
      user,
      isAuthenticated,
    });
  };

export const updateUser = async (req, res, next) => {
    try {
      const { password } = req.body;
      const { id } = req.params;
  
      const user = await User.findByIdAndUpdate(id, { password }, { new: true });
      res.status(200).json({ message: "Update success", data: user });
    } catch (error) {
      next();
    }
  };