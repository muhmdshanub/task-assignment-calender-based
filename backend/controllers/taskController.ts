// controllers/taskController.ts
import { Request, Response, NextFunction } from 'express';
import { createTask , getTaskCountsByMonthForManager, getTaskCountsByMonthForEmployee} from '../services/taskService';
import AppError from '../utils/appError'; // Import the AppError class
import mongoose from 'mongoose';


// @desc Add a new Task
// @route POST /api/task
// @access Private

export const addTask = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { taskName, assignedEmployee, date } = req.body;

    if (!req.user ) {
        return next(new AppError(401, 'Not authorized'));
    }

    const createdManager = req.user._id;

    // Validate the required fields
    if (!taskName || !assignedEmployee || !date) {
      throw new AppError(400, 'All fields are required: taskName, assignedEmployee, dueDate');
    }

    const newTask = await createTask({
      createdManager,
      assignedEmployee,
      taskName,
      date,
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


// @desc get all tasks summary for a month for manager side
// @route GET /api/tasks/summary
// @access Private for manager

export const getTaskCountsForManager = async (req: Request, res: Response, next: NextFunction) => {
  try {

    if (!req.user ) {
      return next(new AppError(401, 'Not authorized'));
  }

    const managerId = req.user._id; // Get the manager ID from the logged-in user
    const { year, month } = req.query; // Get year and month from query params

    

    // Convert year and month from strings to numbers
    const yearInt = parseInt(year as string, 10);
    const monthInt = parseInt(month as string, 10);

    

    // Call the service to fetch task counts for the given month
    const taskCounts = await getTaskCountsByMonthForManager(managerId, yearInt, monthInt);

    res.status(200).json({
      success: true,
      data: taskCounts,
    });

  } catch (error) {
    if (error instanceof AppError) {
      return next(error); // Forward AppError to the global error handler
    }
    next(new AppError(500, 'An unexpected error occurred while fetching task counts.'));
  }
};


// @desc get all tasks summary for a month for employee side
// @route GET /api/tasks/summary/employee
// @access Private for manager

export const getTaskCountsForEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {

    if (!req.user ) {
      return next(new AppError(401, 'Not authorized'));
  }

    const employeeId = req.user._id; // Get the manager ID from the logged-in user
    const { year, month } = req.query; // Get year and month from query params

    

    // Convert year and month from strings to numbers
    const yearInt = parseInt(year as string, 10);
    const monthInt = parseInt(month as string, 10);

    

    // Call the service to fetch task counts for the given month
    const taskCounts = await getTaskCountsByMonthForEmployee(employeeId, yearInt, monthInt);

    res.status(200).json({
      success: true,
      data: taskCounts,
    });

  } catch (error) {
    if (error instanceof AppError) {
      return next(error); // Forward AppError to the global error handler
    }
    next(new AppError(500, 'An unexpected error occurred while fetching task counts.'));
  }
};
