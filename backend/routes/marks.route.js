//marks.routes.js

import express from 'express';
import {saveMarks} from '../controllers/marks.controller.js';

const router = express.Router();

router.post('/saveMarks', saveMarks);


export default router;