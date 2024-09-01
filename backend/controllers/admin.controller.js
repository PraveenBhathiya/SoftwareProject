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

 export const getAllTeachers = async (req, res) => {
    try {
      const teachers = await Teacher.find();
      res.json(teachers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const getTeacher = async (req, res) => {
    const { username } = req.params;
    try {
      const teacher = await Teacher.findOne({ username });
      if (teacher) {
        res.json(teacher);
      } else {
        res.status(404).json({ message: 'Teacher not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const updateTeacher = async (req, res) => {
    const { username } = req.params;
    const { email } = req.body;
    try {
      const teacher = await Teacher.findById(username);
      if (teacher) {
        teacher.username = username || teacher.username;
        teacher.email = email || teacher.email;
        const updatedTeacher = await teacher.save();
        res.json(updatedTeacher);
      } else {
        res.status(404).json({ message: 'Teacher not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const deleteTeacher = async (req, res) => {
    const { username } = req.params;
    try {
      const teacher = await Teacher.findByIdAndDelete(username);
      if (teacher) {
        res.json({ message: 'Teacher deleted successfully' });
      } else {
        res.status(404).json({ message: 'Teacher not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };