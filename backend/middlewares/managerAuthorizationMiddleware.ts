import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError'; // Import your custom error class
import { IUser } from '../models/user'; // Import the IUser interface

// Middleware to check if the logged-in user is a Manager
const protectManager = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        // If no user is found on the request object
        return next(new AppError(401, 'Not authorized, no user found'));
    }

    if (req.user.role !== 'Manager') {
        // If the user's role is not 'Manager'
        return next(new AppError(403, 'Not authorized as a Manager'));
    }

    // Proceed to the next middleware or route handler if the user is a Manager
    next();
};

export default protectManager;
