import express from 'express';
import {signupStudent, signupTeacher, signupAdmin, signin} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signupStudent', signupStudent);
router.post('/signupTeacher', signupTeacher);
router.post('/signupAdmin', signupAdmin);
router.post('/signin', signin);

export default router;