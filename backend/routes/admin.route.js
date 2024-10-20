import express from 'express';
import {getAllStudents, getStudent, updateStudent, deleteStudent, addUser, getStudentData, saveMarks, getStudentMarks} from '../controllers/admin.controller.js';
import {authenticateToken} from '../utils/authenticateToken.js';
const router = express.Router();

router.get('/getAllStudents', getAllStudents);
router.get('/getStudent/:regNo', getStudent );
router.put('/updateStudent/:id', updateStudent);
router.delete('/deleteStudent/:id', deleteStudent);
router.post('/addUser', addUser);
//
router.get('/getStudentData', getStudentData);
router.put('/saveMarks', saveMarks);
//
router.get('/getMarks', authenticateToken, getStudentMarks);
export default router;