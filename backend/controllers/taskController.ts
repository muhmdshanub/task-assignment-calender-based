// controllers/taskController.ts
import { Request, Response, NextFunction } from 'express';
import { createTask } from '../services/taskService';
import AppError from '../utils/appError'; // Import the AppError class
import mongoose from 'mongoose';


// @desc Add a new Task
// @route POST /api/task
// @access Private

export const addTask = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { taskName, assignedEmployee, dueDate } = req.body;

    if (!req.user ) {
        return next(new AppError(401, 'Not authorized'));
    }

    const createdManager = req.user._id;

    // Validate the required fields
    if (!taskName || !assignedEmployee || !dueDate) {
      throw new AppError(400, 'All fields are required: taskName, assignedEmployee, dueDate');
    }

    const newTask = await createTask({
      createdManager,
      assignedEmployee,
      taskName,
      dueDate,
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: newTask,
    });

  } catch (error) {
    // Use AppError for custom error handling
    if (error instanceof AppError) {
        return next(error); // Forward the custom AppError to the error handler
    }

    // Handle other unexpected errors
    next(new AppError(500, 'Internal Server Error')); // Create a generic error for unexpected issues

    console.log(error)
  }
};
