import express from 'express';

const router = express.Router();

//! POST – creating a new project
router.route("/create").post(createProject);
//! GET – returning all projects
router.route("/").get(getProjects);
//! GET a project by Id
router.route("/:id").get(getProjectById);
//! PATCH – updating a project
router.route("/:id").patch(updateProject);
//! DELETE – deleting a project
router.route("/:id").delete(deleteProject);

export default router;