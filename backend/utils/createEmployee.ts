import User from '../models/user'; // Adjust the import path as needed

// Utility function to create an employee user
const createEmployeeUser = async (
  name: string = 'John Smith',
  email: string = 'john.smith@example.com',
  password: string = '12345678',
  managerId?: string // Optional manager ID
) => {
  try {
    // Check if the employee user already exists
    const existingEmployee = await User.findOne({ email });
    if (existingEmployee) {
      console.log('Employee user already exists.');
      return;
    }

    // Create a new employee user
    const employeeUser = new User({
      name,
      email,
      password,
      role: 'Employee', // Set role as Employee
      manager: managerId, // Set the manager ID if provided
    });

    // Save the employee user to the database
    await employeeUser.save();
    console.log('Employee user created successfully.');
  } catch (error: any) {
    console.error('Error creating employee user:', error.message);
  }
};

export default createEmployeeUser;
