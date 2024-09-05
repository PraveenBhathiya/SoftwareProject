import {Student, Teacher, Admin} from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { role, username, email, password, regNo, batch } = req.body;

    if (!role || !username || !email || !password || username === "" || email === "" || password === "") {
        return next(errorHandler(400, "All required fields must be filled!"));
    }

    let user;
    let userData = {
        username,
        email,
        password: bcryptjs.hashSync(password, 10),
    };

    switch (role) {
        case 'student':
            if (!regNo || !batch || regNo === "" || batch === "") {
                return next(errorHandler(400, "Registration number and batch are required for students!"));
            }
            userData = { ...userData, regNo, batch };
            user = new Student(userData);
            break;

        case 'teacher':
            user = new Teacher(userData);
            break;

        case 'admin':
            user = new Admin(userData);
            break;

        default:
            return next(errorHandler(400, "Invalid role specified!"));
    }

    try {
        await user.save();
        res.json(`Signup ${role} successful!`);
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password || username === "" || password === "") {
        return next(errorHandler(400, "All fields are required!"));
    }

    try {
        let validUser;
        let role;

        // Try to find the user in the Student collection
        validUser = await Student.findOne({ username });
        if (validUser) {
            role = 'student';
        } else {
            // Try to find the user in the Teacher collection
            validUser = await Teacher.findOne({ username });
            if (validUser) {
                role = 'teacher';
            } else {
                // Try to find the user in the Admin collection
                validUser = await Admin.findOne({ username });
                if (validUser) {
                    role = 'admin';
                }
            }
        }

        // If no user was found in any of the collections
        if (!validUser) {
            return next(errorHandler(404, "User not found!"));
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if (!validPassword) {
            return next(errorHandler(400, "Invalid Password!"));
        }

        const token = jwt.sign({ id: validUser._id, role: role }, process.env.JWT_SECRET);

        const { password: pass, ...rest } = validUser._doc; // Removing password from the response

        res
            .status(200)
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .json({ ...rest, role });

    } catch (error) {
        next(error);
    }
};
