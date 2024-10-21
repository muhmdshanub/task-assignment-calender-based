// types.ts or similar file
export interface Employee {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    manager?: string; // Optional if not all users will have a manager
  }
  
  
  export interface UsersResponse {
    success: boolean;
    results: number;
    data: Employee[]; // Array of users
  }
  