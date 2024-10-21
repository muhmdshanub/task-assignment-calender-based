// controllers/taskController.ts
import { Request, Response, NextFunction } from 'express';
import { createTask , updateTask, getTaskCountsByMonthForManager, getTaskCountsByMonthForEmployee, fetchTasksByDateForManager, fetchTasksByDateForEmployee} from '../services/taskService';
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


// @desc get all tasks data for a date for manager side
// @route GET /api/tasks/manager
// @access Private for manager

export const getTasksByDateForManager = async (req: Request, res: Response, next:NextFunction) => {
  try {
    
    
    if (!req.user ) {
      return next(new AppError(401, 'Not authorized'));
  }

    const managerId = req.user._id; // Assuming the manager's ID is stored in req.user
    const year = Number(req.query.year);
    const month = Number(req.query.month);
    const day = Number(req.query.day);

    console.log(req.query.year, req.query.month, req.query.day)
    const tasks = await fetchTasksByDateForManager(managerId, year, month, day);

    console.log(tasks)

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return next(error); // Forward AppError to the global error handler
    }
    next(new AppError(500, 'An unexpected error occurred while fetching task data.'));
  }
};


// @desc get all tasks data for a date for employee side
// @route GET /api/tasks/employee
// @access Private for employee

export const getTasksByDateForEmployee = async (req: Request, res: Response, next:NextFunction) => {
  try {
    
    
    if (!req.user ) {
      return next(new AppError(401, 'Not authorized'));
  }

    const employeeId = req.user._id; // Assuming the manager's ID is stored in req.user
    const year = Number(req.query.year);
    const month = Number(req.query.month);
    const day = Number(req.query.day);

    const tasks = await fetchTasksByDateForEmployee(employeeId, year, month, day);

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return next(error); // Forward AppError to the global error handler
    }
    next(new AppError(500, 'An unexpected error occurred while fetching task data.'));
  }
};


// @desc update a task from manager
// @route PUT /api/tasks/:taskId
// @access Private for employee

export const updateTaskById = async (req: Request, res: Response, next: NextFunction) => {
  try {

    console.log("recieved here")
    if (!req.user) {
      return next(new AppError(401, 'Not authorized'));
    }

    const managerId = req.user._id; // Manager's ID from the request
    const taskId = req.params.taskId; // Task ID from the URL
    const { taskName, assignedEmployee, date } = req.body; // Extract task data from the request body

    const updatedTask = await updateTask({
      taskId,
      managerId,
      taskName,
      assignedEmployee,
      date,
    });

    if (!updatedTask) {
      return next(new AppError(404, 'Task not found or not authorized to update'));
    }

     res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: updatedTask,
    });
  } catch (error) {
    next(new AppError(500, 'An unexpected error occurred while updating the task'));
  }
};