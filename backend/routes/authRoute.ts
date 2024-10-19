import express from 'express';
import { login, logout } from '../controllers/authController';
import protectUser from '../middlewares/authMiddleware'
import validateRequest from '../middlewares/validationMiddleware'
import {validateLogin} from '../validators/authValidator'


const router = express.Router();

router.post('/login', validateLogin, validateRequest, login);
router.post('/logout', protectUser,  logout); 

export default router;
