import Project from "../models/Project.js";

export const getAllProjects = async (req, res, next) => {
    try {
        //! Integrating pagination for site listing
        const { page = 1, limit = 10, search = ''} = req.query;

        //! Search filter options for project schema
        const query = {
            $or: [ 
                { title: { $regex: search, $options: "i "}},
                { creator: { $regex: search, $options: "i "}},
                { category: { $regex: search, $options: "i "}},
                { description: { $regex: search, $options: "i "}},
                { skillsRequired: { $regex: search, $options: "i "}},
                { location: { $regex: search, $options: "i "}},
                { status: { $regex: search, $options: "i "}},
            ]
        }

        //! Paginating results
        const projects = await Project.find(query)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        //! Total number of projects for pagination
        const totalResults = await Project.countDocuments(query);

        res.status(200).json({ 
            totalPages: Math.ceil(totalResults / limit),
            currentPage: parseInt(page),
            projects,
            totalResults
        });
    } catch (error) {
        next(error);
    }
};

//!GET a project by Id
export const getProjectById = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            res.status(404).json({ message: "Project not found"});
        }
        res.status(200).json(project);
    } catch (error) {
        next(error);
    }
};

//! POST – Create a new project
export const createProject = async (req, res, next) => {
  
    try {
    const newProject = await Project.create({
        title: req.body.title,
        creator: req.user._id,
        category: req.body.category,
        description: req.body.description,
        skillsRequired: req.body.skillsRequired,
        location: req.body.location,
        status: req.body.status, 
    });

    //! Linking project to the user
    req.user.projectsId.push(newProject);
        await req.user.save();
    
        res.status(201).json(newProject);

    } catch (error) {
        next(error);
    }
}; 

//! PATCH – Updating a project
export const updateProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            res.status(404).json({ message: "Project not found"});
        }

        //! Check if the logged-in user is the creator of the project
        if (project.creator.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error("You are not authorized to update this project")
        }

        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // returning updated document
        );

        res.status(200).json(updatedProject);
    } catch (error) {
        next(error);
    }
};

//! DELETE – removing a project
export const deleteProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            res.status(404).json({ message: "Project not found"});
        }

        //! Check if the logged-in user is the creator or an admin
        if (project.creator.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            res.status(401);
            throw new Error("You are not authorized to delete this project");
        }

        await project.remove();
        res.status(200).json({ message: "Project successfully removed" });
    } catch (error) {
        ndxt(error);
    }
};
