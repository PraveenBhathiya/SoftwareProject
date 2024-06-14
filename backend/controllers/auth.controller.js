import {Student, Teacher, Admin} from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signupStudent = async (req, res, next) => {
    const { username, regNo, email, batch, password } = req.body;

    if (!username || !regNo || !email || !password || !batch || username === "" || regNo === "" || email === "" || password === "" || batch === "") {
        return next(errorHandler(400, "All fileds are required"));
    }

    const hashPassword = bcryptjs.hashSync(password, 10);

    const newStudent = new Student({
        username,
        regNo,
        email,
        batch,
        password: hashPassword,
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
        return next(errorHandler(400, "All fileds are required"));
    }

    const hashPassword = bcryptjs.hashSync(password, 10);

    const newTeacher = new Teacher({
        username,
        email,
        password: hashPassword,
    });

    try {
        await newTeacher.save();
        res.json("SignupTeacher successfull!");
    } catch (error) {
        next(error);
    }
};

export const signupAdmin = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || username === "" || email === "" || password === "") {
        return next(errorHandler(400, "All fileds are required"));
    }

    const hashPassword = bcryptjs.hashSync(password, 10);

    const newAdmin = new Admin({
        username,
        email,
        password: hashPassword,
    });

    try {
        await newAdmin.save();
        res.json("SignupAdmin successfull!");
    } catch (error) {
        next(error);
    }
};

export const signinStudent = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password || username === "" || password === "") {
         next(errorHandler(400, "All fields are required!"));
    }

    try {

        const validUser = await Student.findOne({ username });

        if (!validUser) {
           return next(errorHandler(404, "User not found!"));
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if (!validPassword) {
            return next(errorHandler(400, "Invalid Password!"));
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

export const signinTeacher = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password || username === "" || password === "") {
         next(errorHandler(400, "All fields are required!"));
    }

    try {

        const validUser = await Teacher.findOne({ username });

        if (!validUser) {
           return next(errorHandler(404, "User not found!"));
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if (!validPassword) {
            return next(errorHandler(400, "Invalid Password!"));
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

export const signinAdmin = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password || username === "" || password === "") {
         next(errorHandler(400, "All fields are required!"));
    }

    try {

        const validUser = await Admin.findOne({ username });

        if (!validUser) {
           return next(errorHandler(404, "User not found!"));
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if (!validPassword) {
            return next(errorHandler(400, "Invalid Password!"));
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