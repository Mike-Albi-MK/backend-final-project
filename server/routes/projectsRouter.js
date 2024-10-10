import express from 'express';
import { 
    createProject, 
    getAllProjects, 
    getProjectById, 
    updateProject, 
    deleteProject } from "../controllers/projectsController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

//! Public routes for all users
router.route("/").get(getAllProjects);
router.route("/:id").get(getProjectById);

//! Protect routes that require authentication
router.use(protect);

//! POST – creating a new project
router.route("/create").post(createProject);

//! PATCH – updating a project
router.route("/:id").patch(updateProject);

//! DELETE – deleting a project
router.route("/:id").delete(admin, deleteProject);

export default router;