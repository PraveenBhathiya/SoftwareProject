import express from 'express';
import {getAllStudents} from '../controllers/admin.controller.js';

const router = express.Router();

router.get('/getAllStudents', getAllStudents)


export default router;