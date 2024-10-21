import express from 'express';
import { addTask, getTaskCountsForEmployee, getTaskCountsForManager, getTasksByDateForEmployee, getTasksByDateForManager } from '../controllers/taskController';
import protectUser from '../middlewares/authMiddleware'
import protectManager from '../middlewares/managerAuthorizationMiddleware';
import validateRequest from '../middlewares/validationMiddleware'
import {validateAddTask, validateGetTaskCountForManager, validateGetTaskCountsForEmployee, getTasksByDateValidation} from '../validators/taskValidator'


const router = express.Router();


router.post('/',validateAddTask, validateRequest, protectUser,protectManager,  addTask); 
router.get('/summary/manager',validateGetTaskCountForManager, validateRequest, protectUser, protectManager, getTaskCountsForManager )
router.get('/summary/employee',validateGetTaskCountsForEmployee, validateRequest, protectUser,  getTaskCountsForEmployee )
router.get('/manager', getTasksByDateValidation, validateRequest, protectUser, protectManager, getTasksByDateForManager)
router.get('/employee', getTasksByDateValidation, validateRequest, protectUser,  getTasksByDateForEmployee)

export default router;
