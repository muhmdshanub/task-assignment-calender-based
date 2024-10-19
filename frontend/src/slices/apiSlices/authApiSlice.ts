// src/slices/apiSlices/authApiSlice.ts
import { apiSlice } from './apiSlice';

const AUTH_URL = '/auth'; // Update this based on your backend endpoint

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `${AUTH_URL}/login`,
        method: 'POST',
        body: credentials, // Pass the credentials (email and password)
      }),
      invalidatesTags: ['User'], // Tag for cache invalidation
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: 'POST',
      }),
      invalidatesTags: ['User'], // Tag for cache invalidation
    }),
  }),
});

// Export hooks for usage in functional components
export const { useLoginMutation, useLogoutMutation } = authApiSlice;
