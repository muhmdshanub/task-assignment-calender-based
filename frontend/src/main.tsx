// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import App from './App'; // Main layout component
import LoginScreen from './screens/LoginScreen'; // Login screen component
import DashboardScreen from './screens/DashboardScreen'; // Dashboard screen component


// Create the router with routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<LoginScreen />} />
      <Route path="/dashboard" element={<DashboardScreen />} />
      {/* Fallback route for 404 */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Route>
  )
);

// Render the app to the DOM
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
