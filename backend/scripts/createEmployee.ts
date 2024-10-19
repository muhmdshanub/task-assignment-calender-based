import createEmployeeUser from '../utils/createEmployee'; // Adjust the path as necessary
import connectDB from '../configs/db'; // Adjust the path as needed

const createUsers = async () => {
    // Assuming you have a valid manager's ID
    const managerId = '6712accfa9d1dec56f5b9281'; // Example manager ObjectId

    try {
        await connectDB(); // Connect to the database

        // Create employee users
        await createEmployeeUser('kendral petrie', 'kendral.petrie@example.com', '12345678', managerId);
        await createEmployeeUser('Muhammed Akram', 'akram@example.com', '12345678', managerId);
        await createEmployeeUser('Ram', 'ram@example.com', '12345678', managerId);
        await createEmployeeUser('Manu', 'manu@example.com', '12345678', managerId);
        await createEmployeeUser('Umesh', 'umesh@example.com', '12345678', managerId);
    } catch (error) {
        console.error('Error creating users:', error);
    } finally {
        // Exit the process with a non-zero code if an error occurred
        process.exit(1); // Exit with error code
    }
};

// Call the function to create users
createUsers();
