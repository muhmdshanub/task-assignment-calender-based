// controllers/authController.ts
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/user'; // Import IUser if not already imported
import AppError from '../utils/appError'; // Import AppError
import { getUsersManagedByManagerService } from '../services/userService'; // Import the service



// @desc Controller to get all users managed by the current user
// @route GET /api/users/
// @access Private for Manager role

export const getUsersManagedByCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

        if (!req.user) {
            return next(new AppError(401, 'Not authorized'));
        }

        const managerId = req.user._id; // Extract current user ID (assumed Manager)

        // Fetch users using the service layer
        const users = await getUsersManagedByManagerService(managerId);

        res.status(200).json({
            success: true,
            results: users.length,
            data: users
        });
    } catch (error) {
        next(new AppError(500, 'Server Error'));
    }
};
