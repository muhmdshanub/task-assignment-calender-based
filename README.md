# task-assignment-calender-based

This is a task assignment application that allows users to assign tasks and manage them via a calendar-based interface. The application integrates various features to enhance task management, user authentication, and smooth user experience with a frontend built using React, Vite, TypeScript, and Material-UI and a backend connected via APIs.

# Table of Contents

Features
Technologies
Installation
Usage
API Endpoints
Environment Variables
Deployment
License

# Features

User Authentication: Login, logout functionality.
Task Assignment: Assign tasks to users.
Calendar-based Task View: Manage and view tasks on a calendar.
Task Management: CRUD (Create, Read, Update, Delete) operations for tasks.
API Integration: Fetch data using Redux Toolkit's API slices with caching and tag-based invalidation.

# echnologies
Frontend:
React: A JavaScript library for building user interfaces.
Vite: Next-generation frontend tooling.
TypeScript: Static type definitions to improve code quality.
Material-UI (MUI): A popular UI framework for React applications.
Redux Toolkit: State management with caching and async operations.

Backend:
API: Integration with backend using Redux Toolkit query

# Installation
Prerequisites
Node.js (v16 or higher)
npm or yarn
Backend API (Ensure your backend API is up and running)

Frontend Setup

git clone https://github.com/your-username/task-assignment-calendar-based.git
cd task-assignment-calendar-based/frontend

Install dependencies:
npm install

Set up environment variables

Run the application locally:

npm run dev

Backend Setup:

Running the app locally:

npm run dev

in production
npm run build


# API Endpoints

Auth API
Login: /auth/login (POST) - Requires email and password
Logout: /auth/logout (POST)

Task API
Create Task: /tasks (POST) - Creates a new task.
Get Tasks: /tasks (GET) - Fetches all tasks.
Update Task: /tasks/:id (PUT) - Updates an existing task.
Delete Task: /tasks/:id (DELETE) - Deletes a task.


Create a .env file in the root of the frontend directory and configure the following variables:


VITE_BASE_API_URL=<your-backend-api-url>
VITE_PORT=<port-number> # optional


# user creation

there are scripts available for creating the predefined users [normal and manager] from server itself.

