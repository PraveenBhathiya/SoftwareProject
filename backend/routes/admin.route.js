import express from 'express';
import {getAllStudents, getStudent, updateStudent, deleteStudent, getAllTeachers, getTeacher, updateTeacher, deleteTeacher} from '../controllers/admin.controller.js';
import { createModule } from '../controllers/module.controller.js';

const router = express.Router();

router.get('/getAllStudents', getAllStudents);
router.get('/getStudent/:regNo', getStudent );
router.put('/updateStudent/:id', updateStudent);
router.delete('/deleteStudent/:id', deleteStudent);

router.get('/getAllTeachers', getAllTeachers);
router.get('/getTeacher/:username', getTeacher);
router.put('/updateTeacher/:username', updateTeacher);
router.delete('/deleteTeacher/:username', deleteTeacher);

router.post('/createModule', createModule);

export default router;