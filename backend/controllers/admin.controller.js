import {Student, Teacher, Admin} from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';


export const getAllStudents = async(req, res) => {
    const students = await Student.find({}).sort({createdAt: -1})

    res.status(200).json(students)
}



export const getStudent = async (req, res) => {
    const { regNo } = req.params;
    
    try {
      const student = await Student.findOne({ regNo });
    
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      res.status(200).json(student);
    } catch (error) {
      errorHandler(res, error);
    }
  }

  export const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { username, regNo, email, batch } = req.body;
    try {
      const student = await Student.findById(id);
      if (student) {
        student.username = username || student.username;
        student.regNo = regNo || student.regNo;
        student.email = email || student.email;
        student.batch = batch || student.batch;
        const updatedStudent = await student.save();
        res.json(updatedStudent);
      } else {
        res.status(404).json({ message: 'Student not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const deleteStudent = async (req, res) => {
    const { id } = req.params;
    try {
      const student = await Student.findByIdAndDelete(id);
      if (student) {
        res.json({ message: 'Student deleted successfully' });
      } else {
        res.status(404).json({ message: 'Student not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };