import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user'; // Adjust the import path according to your project structure
import AppError from '../utils/appError'; // Import your custom error class
import { IUser } from '../models/user'; // Import the IUser interface

// Extend the Request interface to include the user property
declare global {
    namespace Express {
        interface Request {
            user?: IUser; // Adding the user property of type IUser
        }
    }
}

// Middleware to check if the user is logged in and is not blocked
const protectUser = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.user_Jwt;



    if (!token) {

        
        // Throw an error if there is no token
        return next(new AppError(401, 'Not authorized, no user token'));
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.USER_JWT_SECRET as jwt.Secret) as { userId: string };

        // Fetch user from the database based on userId
        const user = await User.findById(decoded.userId).select('-password') as IUser; // Cast the user to IUser

        if (!user) {
            // Throw an error if the user is not found
            return next(new AppError(403, 'Not authorized, user not found'));
        }

        req.user = user; // Attach the user to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        // Catch any errors from token verification
        return next(new AppError(401, 'Not authorized, user token failed'));
    }
};

export default protectUser;

