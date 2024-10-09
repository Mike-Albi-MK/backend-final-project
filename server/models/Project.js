import { Schema, model } from "mongoose";

const projectSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Project name is required'],
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    category: {
        type: String,
        enum: ['short film', 'life action', 'animation', 'music video', 'commercial', 'show reel', 'documentary'],
        required: [true, 'Please specifiy the type of your project'],
    },
    description: {
        type: String,
        required: [true, 'Please describe your project'],
        maxlength: [2000, 'Restricted to 2000 characters only']
    },
    skillsRequired: {
        type: [String],
        required: [true, 'Specify which talents are required for this project']
    },
    location: {
        type: String,
    },
    status: {
        type: String,
        ref: 'User',
        required: true,
    },
    }, {
        timestamps: true,
});

    const Project = model("Project", projectSchema)
    export default Project; 