import express from 'express';
import { addTask } from '../controllers/taskController';
import protectUser from '../middlewares/authMiddleware'
import protectManager from '../middlewares/managerAuthorizationMiddleware';
import validateRequest from '../middlewares/validationMiddleware'
import {validateAddTask} from '../validators/taskValidator'


const router = express.Router();


router.post('/',validateAddTask, validateRequest, protectUser,protectManager,  addTask); 

export default router;
