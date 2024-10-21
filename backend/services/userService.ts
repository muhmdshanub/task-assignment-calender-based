import User from '../models/user'; // Import the User model
import mongoose from 'mongoose';

// Service to get all users managed by the current user (Manager)
export const getUsersManagedByManagerService = async (managerId: mongoose.Types.ObjectId) => {
    return await User.aggregate([
        {
            $match: {
                $or: [
                    { manager: managerId }, // Employees managed by the current user
                    { _id: managerId }      // Include the manager themselves
                ]
            }
        },
        {
            $project: {
                password: 0 // Exclude the password field for security
            }
        }
    ]);
};
