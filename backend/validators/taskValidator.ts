import { body } from 'express-validator';

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
    .withMessage('Due date must be a valid date in ISO format (YYYY-MM-DD)')
    .notEmpty()
    .withMessage('Due date is required'),
];
