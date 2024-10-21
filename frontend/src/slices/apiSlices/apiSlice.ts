// src/slices/apiSlices/apiSlice.ts
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

// Update baseQuery without authentication or refresh token logic
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL || "http://localhost:8000/api", // Ensure this is defined in your .env file
  credentials: 'include', // Include credentials with every request, if needed
});

export const apiSlice = createApi({
  reducerPath: 'api', // Custom path for the API slice state
  baseQuery,
  tagTypes: ['Users','Tasks'], // Define your tag types here
  endpoints: (builder) => ({}), // No endpoints defined yet
});

export default apiSlice;
