import express from 'express';
import {getAllStudents, getStudent, updateStudent, deleteStudent,getStudentData, saveMarks} from '../controllers/admin.controller.js';

const router = express.Router();

router.get('/getAllStudents', getAllStudents);
router.get('/getStudent/:regNo', getStudent );
router.put('/updateStudent/:id', updateStudent);
router.delete('/deleteStudent/:id', deleteStudent);
//
router.get('/getStudentData', getStudentData);
router.put('/saveMarks', saveMarks);
export default router;