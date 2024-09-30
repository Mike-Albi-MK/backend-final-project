import { Schema, model } from "mongoose";
import validator from "validator";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    skills: {
        type: String,
        maxlength: [500, 'Restricted to 500 characters']
    },
    location: {
        type: String,
    }

    
})