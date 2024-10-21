import mongoose, { Schema, Document } from 'mongoose';

// Define the Task interface
export interface ITask extends Document {
  _id: mongoose.Types.ObjectId;
  createdManager: mongoose.Types.ObjectId; // Reference to the User ID of the manager who created the task
  assignedEmployee: mongoose.Types.ObjectId; // Reference to the User ID of the assigned employee
  taskName: string; // Name of the task
  date: Date; // Due date of the task
  createdAt: Date;
  updatedAt: Date;
}

// Define the Task schema
const TaskSchema: Schema<ITask> = new Schema({
  createdManager: {
    type: Schema.Types.ObjectId, // Use Schema.Types.ObjectId
    ref: 'User', // Reference to the User model
    required: true,
  },
  assignedEmployee: {
    type: Schema.Types.ObjectId, // Use Schema.Types.ObjectId
    ref: 'User', // Reference to the User model
    required: true,
  },
  taskName: {
    type: String,
    required: true,
    trim: true,
  },
  date: { 
    type: Date,
    required: true,
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Create the Task model
const Task = mongoose.model<ITask>('Task', TaskSchema);

export default Task;
