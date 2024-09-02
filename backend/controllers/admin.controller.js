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



  //////////////MARKS CONTROLLER///////////////////

  // export const getStudentData = async (req, res) => {
  //   try {
  //     const students = await Student.find({}, 'regNo username'); // Fetch only regNo and username
  //     res.json(students); // Send the data to the frontend
  //   } catch (error) {
  //     res.status(500).json({ message: 'Error fetching student data', error });
  //   }
  // };

  // export const saveMarks = async (req, res) => {
  //   const { marks } = req.body; // Array of marks data from the frontend
  
  //   try {
  //     for (const markData of marks) {
  //       const { regNo, presentationMark, vivaMark, contributionMark } = markData;
  
  //       // Fetch the student's username from the Student collection using regNo
  //       const student = await Student.findOne({ regNo }, 'username');
  
  //       if (student) {
  //         const { username } = student; // Extract the username
  
  //         // Update or create the marks for each student
  //         await Marks.findOneAndUpdate(
  //           { regNo, username },
  //           { regNo, username, presentationMark, vivaMark, contributionMark },
  //           { new: true, upsert: true } // Create new document if not found
  //         );
  //       } else {
  //         console.warn(`Student with regNo ${regNo} not found`);
  //       }
  //     }
  //     res.status(200).json({ message: 'Marks saved successfully' });
  //   } catch (error) {
  //     res.status(500).json({ message: 'Error saving marks', error });
  //   }
  // };






////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////


  // Fetch student data along with their marks for a specific evaluation type
export const getStudentData = async (req, res) => {
  const { evaluationType } = req.query; // Proposal, Progress, or Final

  let fieldsToSelect = 'regNo username'; // Always include regNo and username
  if (evaluationType === 'proposal') {
    fieldsToSelect += ' proposal_presentationMark proposal_vivaMark proposal_contributionMark';
  } else if (evaluationType === 'progress') {
    fieldsToSelect += ' progress_presentationMark progress_vivaMark progress_contributionMark';
  } else if (evaluationType === 'final') {
    fieldsToSelect += ' final_presentationMark final_vivaMark final_contributionMark';
  }

  try {
    const students = await Marks.find({}, fieldsToSelect);
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student data in getStudentData', error });
  }
};

// Save marks for a specific evaluation type
export const saveMarks = async (req, res) => {
  const { marks, evaluationType } = req.body; // Array of marks data and evaluation type

  try {
    for (const markData of marks) {
      const { regNo, presentationMark, vivaMark, contributionMark } = markData;

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
    res.status(500).json({ message: 'Error saving marks', error });
  }
};