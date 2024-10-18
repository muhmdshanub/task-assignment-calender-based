// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userAuthReducer from './slices/userAuthSlice'; // Import the userAuth slice
import { apiSlice } from './slices/apiSlices/apiSlice'; // Import the apiSlice

const store = configureStore({
  reducer: {
    userAuth: userAuthReducer, // Include the userAuth reducer
    [apiSlice.reducerPath]: apiSlice.reducer, // Add apiSlice to the store
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Add apiSlice middleware
  devTools: true, // Enable Redux DevTools extension
});

export default store;
