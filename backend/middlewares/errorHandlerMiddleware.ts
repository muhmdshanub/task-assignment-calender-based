import { Request, Response, NextFunction } from 'express';

// Custom error handling middleware for Node.js + TypeScript
const errorHandlerMiddleware = (
  err: any, // or a custom Error type
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Set default status code to 500 if not already set
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Check if the error object has a custom statusCode
  if (err.statusCode) {
    statusCode = err.statusCode;
  }

  // Log the error (optional) for debugging purposes
  console.error(err);

  // Send a JSON response with error message
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined, // Show stack only in development mode
  });
};

export default errorHandlerMiddleware;
