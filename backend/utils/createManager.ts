import User from '../models/user'; // Adjust the import path as needed

// Utility function to create an admin user
const createManagerUser = async (
  name: string = 'Jane Doe',
  email: string = 'jane.doe@example.com',
  password: string = '12345678'
) => {
  try {
    // Check if the admin user already exists
    const existingManager = await User.findOne({ email });
    if (existingManager) {
      console.log('Admin user already exists.');
      return;
    }

    // Create a new admin user
    const managerUser = new User({
      name,
      email,
      password,
      role: 'Manager', // Set role as Manager
    });

    // Save the admin user to the database
    await managerUser.save();
    console.log('Manager user created successfully.');
  } catch (error:any) {
    console.error('Error creating manager user:', error.message);
  }
};

export default createManagerUser;
