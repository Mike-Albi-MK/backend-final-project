import { Schema, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

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
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        }
    }, {
        timestamps: true,
    });

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
    if (this._update && this._update.password) {
        this._update.password = await bcrypt.hash(this._update.password, 12);
    }
    next();
});

userSchema.methods.isPasswordCorrect = async function (
    inputPassword,
    storedPassword) {
        return bcrypt.compare(inputPassword, storedPassword);
    };

const User = model("User", userSchema);
export default User;