// src/slices/apiSlices/usersApiSlice.ts
import { apiSlice } from './apiSlice';
import {UsersResponse} from '../../types/employeeUserData'

const USERS_URL = '/users'; // API endpoint URL

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsersManagedByCurrentUser: builder.query<UsersResponse, void>({
      query: () => ({
        url: `${USERS_URL}/`,
        method: 'GET',
      }),
      // Optional: You can specify caching or tag invalidation if necessary
      providesTags: ['Users'],
    }),
  }),
});

// Export hooks for usage in functional components
export const { useLazyGetUsersManagedByCurrentUserQuery } = usersApiSlice;
