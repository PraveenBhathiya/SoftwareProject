import {Student, Teacher, Admin} from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

//get all students
export const getAllStudents = async(req, res) => {
    const students = await Student.find({}).sort({createdAt: -1})

    res.status(200).json(students)
}


// Get a single student by regNo
export const getStudent = async (req, res) => {
    const { regNo } = req.params;
    
    try {
      const student = await Student.findOne({ regNo });
    
      if (!student) {
        return res.status(404).json({ error: 'No such student' });
      }
    
      res.status(200).json(student);
    } catch (error) {
      errorHandler(error, req, res);
    }
  }