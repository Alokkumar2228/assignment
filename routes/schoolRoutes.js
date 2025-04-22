import express from 'express';
const router = express.Router();

import {validateSchool,validateLocation} from '../middleware/validateAddSchool.js';
import { addSchool,getNearbySchools } from '../controller/schoolController.js';



// to add school

router.post('/addSchool',validateSchool,addSchool);
router.get('/listSchools',validateLocation,getNearbySchools);

export default router;

