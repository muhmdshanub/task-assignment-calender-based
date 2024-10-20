// services/taskService.ts
import Task, { ITask } from '../models/task';
import User from '../models/user'; // Assuming you have a User model
import AppError from '../utils/appError'; // Import the AppError class
import mongoose from 'mongoose';


export const createTask = async (taskDetails: {
  createdManager: mongoose.Types.ObjectId;
  assignedEmployee: mongoose.Types.ObjectId;
  taskName: string;
  dueDate: Date;
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
