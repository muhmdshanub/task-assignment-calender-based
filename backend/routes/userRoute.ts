import express from 'express';
import { getUsersManagedByCurrentUser } from '../controllers/userControlelr';
import protectUser from '../middlewares/authMiddleware'
import protectManager from '../middlewares/managerAuthorizationMiddleware';



const router = express.Router();


router.get('/', protectUser,protectManager,  getUsersManagedByCurrentUser); 

export default router;
