import express from 'express';
import {getAllStudents, getStudent} from '../controllers/admin.controller.js';

const router = express.Router();

router.get('/getAllStudents', getAllStudents);
router.get('/getStudent', getStudent );


export default router;