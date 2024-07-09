import {Student, Teacher, Admin} from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

//get all students
export const getAllStudents = async(req, res) => {
    const students = await Student.find({}).sort({createdAt: -1})

    res.status(200).json(students)
}