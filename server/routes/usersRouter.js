import express from "express";
import { signup, login, logout, getUser, updateUser, getMe } from "../controllers/usersController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes

//! Register as new user
router.route("/register").post(signup);

//! Login as existing user
router.route("/login").post(login);

//! Logout as user
router.route("/logout").get(logout);


// Protected Routes:

//! Authentication middleware to protect certain routes
router.use(protect);

//! GET any user's profile
router.route("/profile").get(getUser);

//! Updating authenticated user's profile
router.route("/update").patch(updateUser);

//! GET current user's profile
router.route("/me").get(getMe);

export default router;