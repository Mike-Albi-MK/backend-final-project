import asynchandler from "express-async-handler";

//! Check if the user is an admin
export const admin = asynchandler(async (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403);
        throw new Error(`Access denied, you are no admin`)
    }
});