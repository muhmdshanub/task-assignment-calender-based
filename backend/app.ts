import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware';

// Initialize environment variables
dotenv.config();

// Initialize the Express app
const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON data
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(cookieParser()); // Parse cookies

// Placeholder route for now
app.get('/', (req: Request, res: Response) => {
  res.send('Task Assignment App Backend is Running!');
});

// Attach the error handler middleware after all routes
app.use(errorHandlerMiddleware);

export default app;
