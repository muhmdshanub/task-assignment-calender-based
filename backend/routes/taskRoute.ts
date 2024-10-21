import express from 'express';
import { addTask, getTaskCountsForEmployee, getTaskCountsForManager } from '../controllers/taskController';
import protectUser from '../middlewares/authMiddleware'
import protectManager from '../middlewares/managerAuthorizationMiddleware';
import validateRequest from '../middlewares/validationMiddleware'
import {validateAddTask, validateGetTaskCountForManager, validateGetTaskCountsForEmployee} from '../validators/taskValidator'


const router = express.Router();


router.post('/',validateAddTask, validateRequest, protectUser,protectManager,  addTask); 
router.get('/summary/manager',validateGetTaskCountForManager, validateRequest, protectUser, protectManager, getTaskCountsForManager )
router.get('/summary/employee',validateGetTaskCountsForEmployee, validateRequest, protectUser,  getTaskCountsForEmployee )



export default router;
