import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import AppError from '../utils/appError'; // Import AppError

// Middleware to handle validation results
 const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Log the error details for debugging purposes
        console.log(req.body);
        console.log(JSON.stringify(errors.array()));

        // Create a validation error using AppError
        const validationError = new AppError(400, 'Validation failed', errors.array());

        // Pass error to the next middleware
        return next(validationError);
    }

    next(); // Continue to the next middleware if no validation errors
};

export default validateRequest;
