// controllers/authController.ts
import { Request, Response, NextFunction } from 'express';
import { loginService } from '../services/authService';
import createTokenAndSetCookie from '../utils/createTokenAndSetCookie';
import { IUser } from '../models/user'; // Import IUser if not already imported
import AppError from '../utils/appError'; // Import AppError


// @desc Login a user
// @route POST /api/auth/login
// @access Public

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        // Get user and assert its type
        const { user } = await loginService(email, password) as { user: IUser }; // Explicitly cast the response
        

        // Use utility function to create JWT token and set cookie
        createTokenAndSetCookie(user._id.toString(), res);

        res.status(200).json({
            message: 'Login successful',
            userData: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error: any) {
        // Use AppError for custom error handling
        if (error instanceof AppError) {
            return next(error); // Forward the custom AppError to the error handler
        }

        // Handle other unexpected errors
        next(new AppError(500, 'Internal Server Error')); // Create a generic error for unexpected issues

        console.log(error)
    }
};


// @desc Logout a user
// @route POST /api/auth/logout
// @access Private
export const logout = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Clear the cookie by setting it to a past date
        res.cookie('user_Jwt', '', { expires: new Date(0), httpOnly: true });

        res.status(200).json({
            message: 'Logout successful',
        });
    } catch (error) {
        next(new AppError(500, 'Internal Server Error')); // Handle any errors that may occur
    }
};