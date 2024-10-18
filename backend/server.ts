import app from './app'; // Import the Express app
import connectDB from './configs/db'; // Import database connection function
import dotenv from 'dotenv'; // Import dotenv to load environment variables

// Load environment variables
dotenv.config();

// Function to start the server
const startServer = async () => {
  try {
    // Wait for the database connection to be established
    await connectDB();

    // Get the port from environment variables or default to 5000
    const PORT = process.env.PORT || 5000;

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error: any) {
    console.error('Error starting server:', error.message);
    process.exit(1); // Exit process with failure
  }
};

// Call the startServer function to initiate the server
startServer();
