import {Student, Teacher} from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signupStudent = async (req, res, next) => {
    const { username, regNo, email, batch, password } = req.body;

    if (!username || !regNo || !email || !password || !batch || username === "" || regNo === "" || email === "" || password === "" || batch === "") {
        next(errorHandler(400, "All fileds are required"));
    }

    const hashPassword = bcryptjs.hashSync(password, 10);

    const newStudent = new Student({
        username,
        regNo,
        email,
        batch,
        password,
    });

    try {
        await newStudent.save();
        res.json("SignupStudent successfull!");
    } catch (error) {
        next(error);
    }
};

export const signupTeacher = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || username === "" || email === "" || password === "") {
        next(errorHandler(400, "All fileds are required"));
    }

    const hashPassword = bcryptjs.hashSync(password, 10);

    const newTeacher = new Teacher({
        username,
        email,
        password,
    });

    try {
        await newTeacher.save();
        res.json("SignupTeacher successfull!");
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { regNo, password } = req.body;

    if (!regNo || !password || regNo === "" || password === "") {
        next(errorHandler(400, "All fields are required!"));
    }

    try {

        const validUser = await User.findOne({ regNo });

        if (!validUser) {
            next(errorHandler(404, "User not found!"));
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if (!validPassword) {
            next(errorHandler(400, "Invalid Password!"));
        }

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

        const {password: pass, ...rest} = validUser._doc;   //removing paaword from seen

        res
            .status(200)
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .json(rest);

    } catch (error) {
        next(error);
    }
};