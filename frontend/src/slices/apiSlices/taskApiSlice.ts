// src/slices/apiSlices/taskApiSlice.ts
import { apiSlice } from './apiSlice';
import {TaskCountResponse,  GetTaskCountsQueryParams, GetTaskCountsForEmployeeQueryParams, TaskListResponse, GetTasksForManagerQueryParams, UpdateTaskInput, UpdateTaskResponse } from '../../types/taskTypes'; // Adjust the import path as necessary


// Define the base URL for tasks
const TASK_URL = '/task'; // Update this based on your backend endpoint

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addTask: builder.mutation({
      query: (task) => ({
        url: `${TASK_URL}/`, // Ensure this matches your backend route
        method: 'POST',
        body: task, // Pass the task details in the request body
      }),
      // Invalidate relevant cache entries after this mutation
      invalidatesTags: ['Tasks'], // Update this to match your tag setup
    }),

    // Endpoint to get task counts for manager
    getTaskCountsByMonthForManager: builder.query<TaskCountResponse, GetTaskCountsQueryParams>({
      query: ({  year, month }) => ({
        url: `${TASK_URL}/summary/manager`, // Ensure this matches your backend route
        method: 'GET',
        params: { year, month }, // Pass the parameters in the query
      }),
      providesTags: ['Tasks'], // Update this to match your tag setup
    }),

    // Endpoint to get task counts for user
    getTaskCountsByMonthForEmployee: builder.query<TaskCountResponse, GetTaskCountsForEmployeeQueryParams>({
      query: ({  year, month }) => ({
        url: `${TASK_URL}/summary/employee`, // Ensure this matches your backend route
        method: 'GET',
        params: {  year, month }, // Pass the parameters in the query
      }),
      providesTags: ['Tasks'], // Update this to match your tag setup
    }),

    // New endpoint to get tasks for a manager by month
    getTasksByMonthForManager: builder.query<TaskListResponse, GetTasksForManagerQueryParams>({
      query: ({ year, month , day}) => ({
        url: `${TASK_URL}/manager`, // Ensure this matches your backend route for fetching tasks
        method: 'GET',
        params: { year, month, day }, // Pass the parameters in the query
      }),
      providesTags: ['Tasks'], // Update this to match your tag setup
    }),

    // New endpoint to get tasks for a manager by month
    getTasksByMonthForEmployee: builder.query<TaskListResponse, GetTasksForManagerQueryParams>({
      query: ({ year, month , day}) => ({
        url: `${TASK_URL}/employee`, // Ensure this matches your backend route for fetching tasks
        method: 'GET',
        params: { year, month, day }, // Pass the parameters in the query
      }),
      providesTags: ['Tasks'], // Update this to match your tag setup
    }),

    updateTask: builder.mutation<UpdateTaskResponse, UpdateTaskInput>({
      query: ({ taskId,  taskName, assignedEmployee, date }) => ({
        url: `${TASK_URL}/${taskId}`, // Ensure this matches your backend route for updating the task
        method: 'PUT', // Use PUT or POST depending on your backend setup
        body: { taskName, assignedEmployee, date }, // Pass the task updates in the request body
        
      }),
      invalidatesTags: ['Tasks'], // Invalidate relevant cache entries after this mutation
    }),

    deleteTask: builder.mutation<{ message: string }, string>({
      query: (taskId) => ({
        url: `${TASK_URL}/${taskId}`, // Ensure this matches your backend route for deleting the task
        method: 'DELETE', // Use DELETE for deletion
      }),
      invalidatesTags: ['Tasks'], // Invalidate relevant cache entries after deletion
    }),

    
  }),
});

// Export hooks for usage in functional components
export const {
  useAddTaskMutation,
  useLazyGetTaskCountsByMonthForManagerQuery,
  useLazyGetTaskCountsByMonthForEmployeeQuery,
  useLazyGetTasksByMonthForEmployeeQuery,
  useLazyGetTasksByMonthForManagerQuery ,
  useUpdateTaskMutation,
  useDeleteTaskMutation,

} = taskApiSlice;
