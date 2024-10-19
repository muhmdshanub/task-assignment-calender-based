// createManager.ts

import connectDB from '../configs/db'; // Adjust the path as needed
import createManagerUser from '../utils/createManager'; // Adjust the path as needed
import dotenv from 'dotenv';

dotenv.config();

const start = async () => {
    try {
        // Connect to the database
        await connectDB();

        // Create the admin user
        await createManagerUser();
        console.log('Manager user created successfully!');
    } catch (err) {
        console.error('Error creating manager user:', err);
    } finally {
        process.exit(); // Exit the process
    }
};

start();
