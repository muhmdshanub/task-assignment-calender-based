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