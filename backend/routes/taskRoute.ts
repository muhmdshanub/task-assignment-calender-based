import express from 'express';
import { addTask, getTaskCountsForEmployee, getTaskCountsForManager, getTasksByDateForEmployee, getTasksByDateForManager, updateTaskById } from '../controllers/taskController';
import protectUser from '../middlewares/authMiddleware'
import protectManager from '../middlewares/managerAuthorizationMiddleware';
import validateRequest from '../middlewares/validationMiddleware'
import {validateAddTask, validateGetTaskCountForManager, validateGetTaskCountsForEmployee, getTasksByDateValidation, updateTaskValidator} from '../validators/taskValidator'


const router = express.Router();


router.post('/',validateAddTask, validateRequest, protectUser,protectManager,  addTask);
router.put('/:taskId',updateTaskValidator, validateRequest, protectUser,protectManager,  updateTaskById);
router.get('/summary/manager',validateGetTaskCountForManager, validateRequest, protectUser, protectManager, getTaskCountsForManager )
router.get('/summary/employee',validateGetTaskCountsForEmployee, validateRequest, protectUser,  getTaskCountsForEmployee )
router.get('/manager', getTasksByDateValidation, validateRequest, protectUser, protectManager, getTasksByDateForManager)
router.get('/employee', getTasksByDateValidation, validateRequest, protectUser,  getTasksByDateForEmployee)

export default router;
