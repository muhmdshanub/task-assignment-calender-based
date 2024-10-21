// src/types/taskTypes.ts




  export interface TaskCountResponse {
    success: boolean;
    data: { [date: string]: number };
  }
  
  export interface GetTaskCountsQueryParams {
    year: number; // Year as a number
    month: number; // Month as a number
  }
  
  export interface GetTaskCountsForEmployeeQueryParams {
    year: number; // Year as a number
    month: number; // Month as a number
  }

  export interface GetTasksForManagerQueryParams{
    year: number; // Year as a number
    month: number; // Month as a number
    day: number;
  }


  export interface TaskUser {
    _id: string; // User ID
    name: string; // User name
  }
  
  export interface Task {
    _id: string; // Task ID
    createdManager: TaskUser; // Populated manager info (ID and name)
    assignedEmployee: TaskUser; // Populated employee info (ID and name)
    taskName: string; // Name of the task
    date: string; // Date string for the task (in ISO format or 'YYYY-MM-DD')
    createdAt: string; // Timestamp when the task was created
    updatedAt: string; // Timestamp when the task was last updated
  }

  export interface TaskListResponse {
    success: boolean; // Indicates if the response was successful
    data: Task[];    // Array of task data
  }

  export interface UpdateTaskInput {
    taskId: string; // Task ID to update
    taskName: string; // New task name
    assignedEmployee: string; // New assigned employee (ID)
    date: string; // ISO-formatted date string
  }
  
  export interface UpdateTaskResponse {
    success: boolean; // Indicates if the response was successful
    message: string;
    data: Task;    // Array of task data
  }