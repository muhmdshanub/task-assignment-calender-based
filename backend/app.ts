import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware';

import authRoute from './routes/authRoute'
import userRoute from './routes/userRoute'
import taskRoute from './routes/taskRoute'

// Initialize environment variables
dotenv.config();

// Initialize the Express app
const app = express();

// CORS options
const corsOptions = {
  origin:  process.env.FRONT_END_URL, // Allow all origins
  credentials: true, // Allow credentials (cookies)
};

// Middleware
app.use(express.json()); // Parse incoming JSON data
app.use(cors(corsOptions)); // Enable Cross-Origin Resource Sharing
app.use(cookieParser()); // Parse cookies


app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/task', taskRoute)

// Placeholder route for now
app.get('/', (req: Request, res: Response) => {
  res.send('Task Assignment App Backend is Running!');
});

// Attach the error handler middleware after all routes
app.use(errorHandlerMiddleware);

export default app;
