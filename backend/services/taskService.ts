// services/taskService.ts
import Task, { ITask } from '../models/task';
import User from '../models/user'; // Assuming you have a User model
import AppError from '../utils/appError'; // Import the AppError class
import mongoose from 'mongoose';


export const createTask = async (taskDetails: {
  createdManager: mongoose.Types.ObjectId;
  assignedEmployee: mongoose.Types.ObjectId;
  taskName: string;
  date: Date;
}): Promise<ITask> => {
  const { createdManager, assignedEmployee } = taskDetails;

  // Verify that the assignedEmployee is managed by createdManager
  const employee = await User.findById(assignedEmployee).select('manager');
  
  if (!employee) {
    throw new AppError(404, 'Assigned employee not found');
  }

  if (employee.manager?.toString() !== createdManager.toString()) {
    throw new AppError(400, 'Assigned employee is not a direct report of the manager');
  }

  const task = new Task(taskDetails);
  return await task.save();
};


// Helper function to generate all valid dates for a given month and year
const _generateValidDatesForMonth = (year: number, month: number) => {
  const validDates: string[] = [];
  const daysInMonth = new Date(year, month, 0).getDate(); // month is 1-based

  for (let day = 1; day <= daysInMonth; day++) {
    // Format each date as YYYY-MM-DD
    const date = new Date(year, month - 1, day+1).toISOString().split('T')[0];
    validDates.push(date);
  }
  
  return validDates;
};

export const getTaskCountsByMonthForManager = async (managerId: mongoose.Types.ObjectId, year: number, month: number) => {
  try {
    // Convert managerId to ObjectId
    const managerObjectId = new mongoose.Types.ObjectId(managerId);

    // Calculate the start and end dates for the selected month
    const startDate = new Date(year, month - 1, 1); // Start of the month (0-based month index)
    const endDate = new Date(year, month, 1); // First day of the next month

    // Aggregate task counts for each day of the month for the current manager
    const taskCounts = await Task.aggregate([
      {
        $match: {
          createdManager: managerObjectId, // Match tasks created by the logged-in manager
          date: { $gte: startDate, $lt: endDate }, // Filter tasks within the selected month
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } }, // Group by day
          count: { $sum: 1 }, // Count tasks per day
        },
      },
    ]);

    // Create an object to hold task counts
    const taskCountObject: { [key: string]: number } = {};

    // Populate the taskCountObject with counts from taskCounts
    taskCounts.forEach(task => {
      taskCountObject[task._id] = task.count; // Assign count to the corresponding date
    });

    // Generate valid dates for the specified month
    const validDates = _generateValidDatesForMonth(year, month);

    // Update the taskCountObject to include all valid dates with counts
    validDates.forEach(date => {
      if (!(date in taskCountObject)) {
        taskCountObject[date] = 0; // Initialize count to 0 if date is not in taskCountObject
      }
    });

    
    return taskCountObject; // Return the final counts object
  } catch (error) {
    throw new AppError(500, 'Failed to retrieve task counts', error);
  }
};


export const getTaskCountsByMonthForEmployee = async (employeeId: mongoose.Types.ObjectId, year: number, month: number) => {
  try {
    // Calculate the start and end dates for the selected month
    const startDate = new Date(year, month - 1, 1); // Start of the month
    const endDate = new Date(year, month, 1); // First day of the next month

    // Aggregate task counts for each day of the month for the assigned user
    const taskCounts = await Task.aggregate([
      {
        $match: {
          assignedEmployee: employeeId, // Match tasks assigned to the user
          date: { $gte: startDate, $lt: endDate }, // Filter tasks within the selected month
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } }, // Group by day
          count: { $sum: 1 }, // Count tasks per day
        },
      },
    ]);

    // Create an object to hold task counts
    const taskCountObject: { [key: string]: number } = {};

    // Populate the taskCountObject with counts from taskCounts
    taskCounts.forEach(task => {
      taskCountObject[task._id] = task.count; // Assign count to the corresponding date
    });

    // Generate valid dates for the specified month
    const validDates = _generateValidDatesForMonth(year, month);

    // Update the taskCountObject to include all valid dates with counts
    validDates.forEach(date => {
      if (!(date in taskCountObject)) {
        taskCountObject[date] = 0; // Initialize count to 0 if date is not in taskCountObject
      }
    });

    return taskCountObject; // Return the final counts object
  } catch (error) {
    throw new AppError(500, 'Failed to retrieve task counts', error);
  }
};


// Utility function to generate start and end of the day for date matching
const getStartAndEndOfDay = (year: number, month: number, day: number) => {
  const startOfDay = new Date(year, month - 1, day); // Midnight of the specified day
  const endOfDay = new Date(year, month - 1, day + 1); // Midnight of the next day
  return { startOfDay, endOfDay };
};

// Fetch tasks by date for a manager with user lookup
export const fetchTasksByDateForManager = async (
  managerId: mongoose.Types.ObjectId,
  year: number,
  month: number,
  day: number
) => {
  const { startOfDay, endOfDay } = getStartAndEndOfDay(year, month, day);

  const tasks = await Task.aggregate([
    {
      $match: {
        createdManager: managerId,
        date: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      },
    },
    // Lookup the 'createdManager' field from the 'User' collection
    {
      $lookup: {
        from: 'users', // The collection where users are stored
        localField: 'createdManager',
        foreignField: '_id',
        as: 'createdManagerDetails',
      },
    },
    // Lookup the 'assignedEmployee' field from the 'User' collection
    {
      $lookup: {
        from: 'users',
        localField: 'assignedEmployee',
        foreignField: '_id',
        as: 'assignedEmployeeDetails',
      },
    },
    // Unwind the arrays to get single objects
    { $unwind: '$createdManagerDetails' },
    { $unwind: '$assignedEmployeeDetails' },
    // Project only the required fields
    {
      $project: {
        _id: 1,
        taskName: 1,
        date: 1,
        createdAt: 1,
        updatedAt: 1,
        createdManager: {
          _id: '$createdManagerDetails._id',
          name: '$createdManagerDetails.name', // Assuming User model has 'name' field
        },
        assignedEmployee: {
          _id: '$assignedEmployeeDetails._id',
          name: '$assignedEmployeeDetails.name', // Assuming User model has 'name' field
        },
      },
    },
  ]);

  return tasks; // Return tasks with user name details
};

// Fetch tasks by date for an employee with user lookup
export const fetchTasksByDateForEmployee = async (
  employeeId: mongoose.Types.ObjectId,
  year: number,
  month: number,
  day: number
) => {
  const { startOfDay, endOfDay } = getStartAndEndOfDay(year, month, day);

  const tasks = await Task.aggregate([
    {
      $match: {
        assignedEmployee: employeeId,
        date: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      },
    },
    // Lookup the 'createdManager' field from the 'User' collection
    {
      $lookup: {
        from: 'users',
        localField: 'createdManager',
        foreignField: '_id',
        as: 'createdManagerDetails',
      },
    },
    // Lookup the 'assignedEmployee' field from the 'User' collection
    {
      $lookup: {
        from: 'users',
        localField: 'assignedEmployee',
        foreignField: '_id',
        as: 'assignedEmployeeDetails',
      },
    },
    // Unwind the arrays to get single objects
    { $unwind: '$createdManagerDetails' },
    { $unwind: '$assignedEmployeeDetails' },
    // Project only the required fields
    {
      $project: {
        _id: 1,
        taskName: 1,
        date: 1,
        createdAt: 1,
        updatedAt: 1,
        createdManager: {
          _id: '$createdManagerDetails._id',
          name: '$createdManagerDetails.name',
        },
        assignedEmployee: {
          _id: '$assignedEmployeeDetails._id',
          name: '$assignedEmployeeDetails.name',
        },
      },
    },
  ]);

  return tasks; // Return tasks with user name details
};

interface UpdateTaskInput {
  taskId: mongoose.Types.ObjectId | string;
  managerId: mongoose.Types.ObjectId | string;
  taskName: string;
  assignedEmployee: mongoose.Types.ObjectId | string;
  date: string; // Date in ISO format
}

export const updateTask = async ({
  taskId,
  managerId,
  taskName,
  assignedEmployee,
  date,
}: UpdateTaskInput) => {
  const formattedDate = new Date(date);

  const employee = await User.findById(assignedEmployee);
  if (!employee) {
    throw new AppError(404, 'Assigned employee not found');
  }

  if (employee.manager?.toString() !== managerId.toString()) {
    throw new AppError(403, 'You are not the manager of the assigned employee');
  }

  // Update the task only if it is created by the manager
  const updatedTask = await Task.findOneAndUpdate(
    { _id: taskId, createdManager: managerId },
    {
      taskName,
      assignedEmployee,
      date: formattedDate, // Update date as a proper Date object
    },
    { new: true } // Return the updated document
  )
    .populate('createdManager', '_id name') // Populate manager data
    .populate('assignedEmployee', '_id name'); // Populate assigned employee data

  return updatedTask;
};