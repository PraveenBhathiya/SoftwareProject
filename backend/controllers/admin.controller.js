import {Student, Teacher, Admin} from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
//
import {Marks} from '../models/marks.model.js';


export const getAllStudents = async(req, res) => {
    const students = await Student.find({}).sort({createdAt: -1})

    res.status(200).json(students)
};



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
  };

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

  export const addUser = async (req, res, next) => {
    const { role, username, email, regNo, batch, password } = req.body;
  
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
  
      default:
        return next(errorHandler(400, "Invalid role specified!"));
    }
  
    try {
      await user.save();
      res.json({ success: `Add ${role} successful!` });  // Corrected response
    } catch (error) {
      console.error("Error occurred in addUser:", error.message);
      next(errorHandler(500, "An error occurred while adding the user.")); 
    }
  };
  



  //////////////MARKS CONTROLLER///////////////////

export const getStudentData = async (req, res) => {
  const { evaluationType } = req.query;

  // Define fields to select based on evaluationType
  let fieldsToSelect = 'regNo username'; // Always include regNo and username
  let markFields = '';

  switch (evaluationType) {
    case 'proposal':
      markFields = 'proposal_presentationMark proposal_vivaMark proposal_contributionMark';
      break;
    case 'progress':
      markFields = 'progress_presentationMark progress_vivaMark progress_contributionMark';
      break;
    case 'final':
      markFields = 'final_presentationMark final_vivaMark final_contributionMark';
      break;
    default:
      return res.status(400).json({ message: 'Invalid evaluation type.' });
  }

  fieldsToSelect += ' ' + markFields;

  try {
    // Fetch students with the selected fields
    const students = await Marks.find({}, fieldsToSelect);
    
    if (!students || students.length === 0) {
      return res.status(404).json({ message: 'No student data found.' });
    }

    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student data through getStudentData', error });
  }
};



// Save marks for a specific evaluation type
export const saveMarks = async (req, res) => {
  const { marks, evaluationType } = req.body; // Array of marks data and evaluation type

  try {
    for (const markData of marks) {
      const { regNo, presentationMark, vivaMark, contributionMark } = markData;   //why no username?

      const updateData = {};
      if (evaluationType === 'proposal') {
        updateData.proposal_presentationMark = presentationMark;
        updateData.proposal_vivaMark = vivaMark;
        updateData.proposal_contributionMark = contributionMark;
      } else if (evaluationType === 'progress') {
        updateData.progress_presentationMark = presentationMark;
        updateData.progress_vivaMark = vivaMark;
        updateData.progress_contributionMark = contributionMark;
      } else if (evaluationType === 'final') {
        updateData.final_presentationMark = presentationMark;
        updateData.final_vivaMark = vivaMark;
        updateData.final_contributionMark = contributionMark;
      }

      await Marks.findOneAndUpdate(
        { regNo },
        updateData,
        { new: true, upsert: true } // Create new document if not found
      );
    }
    res.status(200).json({ message: 'Marks saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving marks through saveMarks', error });
  }
};