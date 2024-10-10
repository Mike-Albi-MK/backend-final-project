import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

import { connectToDB } from "./libs/db.js";
import usersRoutes from "./routes/usersRouter.js";
import projectsRoutes from "./routes/projectsRouter.js";
import { globalErrorHandler, routeNotFound } from "./middleware/errorHandler.js";

//! Connection to database
await connectToDB();

const app = express();
const PORT = process.env.PORT || 5000;

//! Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//! CORS 
app.use(
    cors({
      origin: process.env.EXPRESS_CLIENT_URL,
      credentials: true,
    })
  );

//! Routes
app.use("/api/users", usersRoutes);
app.use("/api/projects", projectsRoutes);

//! Catch 404 for undefined routes
app.use(routeNotFound);
//! Global error handler middleware
app.use(globalErrorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));