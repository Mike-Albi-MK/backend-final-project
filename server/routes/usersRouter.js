import express from "express";

const router = express.Router();

//! Register as new user
router.route("/register").post(signup);
//! Login as existing user
router.route("/login").post(login);
//! Logout as user
router.route("logout").get(logout);
//! GET user profiles
router.route("/profile").get(getUser);
//! Updating a user profile
router.route("/update/:id").patch(updateUser);

router.use(protect);
router.route("/me").get(getMe);

export default router;