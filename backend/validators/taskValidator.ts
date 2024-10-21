import { body, check, param } from 'express-validator';

export const validateAddTask = [
  body('taskName')
    .isString()
    .withMessage('Task name must be a string')
    .notEmpty()
    .withMessage('Task name is required'),
  
  body('assignedEmployee')
    .isMongoId()
    .withMessage('Assigned employee must be a valid ObjectId')
    .notEmpty()
    .withMessage('Assigned employee is required'),
  
  body('date')
    .isISO8601()
    .withMessage(' date must be a valid date in ISO format (YYYY-MM-DD)')
    .notEmpty()
    .withMessage(' date is required'),
];

export const updateTaskValidator = [
  param('taskId').isMongoId().withMessage('Invalid task ID'), // Ensure the task ID is valid
  body('taskName').notEmpty().withMessage('Task name is required'),
  body('assignedEmployee')
    .isMongoId()
    .withMessage('Invalid employee ID'),
  body('date')
    .isISO8601({ strict: true })
    .withMessage('Invalid date format, must be in ISO 8601 format (yyyy-mm-dd)'),
];

export const validateDeleteTask = [
  param('taskId')
    .isMongoId()
    .withMessage('Invalid Task ID'),
];


import { query } from 'express-validator';

export const validateGetTaskCountForManager = [
  query('year')
    .isInt({ min: 2000, max: 2100 }) // Ensure the year is an integer within a realistic range
    .withMessage('Year must be an integer between 2000 and 2100')
    .notEmpty()
    .withMessage('Year is required'),

  query('month')
    .isInt({ min: 1, max: 12 }) // Validate that month is between 1 and 12
    .withMessage('Month must be an integer between 1 and 12')
    .notEmpty()
    .withMessage('Month is required'),
];

export const validateGetTaskCountsForEmployee = [
  query('year')
    .isInt({ min: 2000, max: 2100 })
    .withMessage('Year must be an integer between 2000 and 2100')
    .notEmpty()
    .withMessage('Year is required'),

  query('month')
    .isInt({ min: 1, max: 12 })
    .withMessage('Month must be an integer between 1 and 12')
    .notEmpty()
    .withMessage('Month is required'),
];


export const getTasksByDateValidation = [
  query('year')
    .isInt({ min: 2000, max: 2100 }) // Adjust range as needed
    .withMessage('Year must be a valid integer between 2000 and 2100'),
  query('month')
    .isInt({ min: 1, max: 12 })
    .withMessage('Month must be a valid integer between 1 and 12'),
  query('day')
    .isInt({ min: 1, max: 31 })
    .withMessage('Day must be a valid integer between 1 and 31'),
];
