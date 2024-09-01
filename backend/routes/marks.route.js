//marks.routes.js

import express from 'express';
import {saveMarks, getStudentData} from '../controllers/marks.controller.js';

const router = express.Router();

router.put('/saveMarks', saveMarks);
router.get('/getStudentData', getStudentData);


export default router;