// services/authService.ts
import User from '../models/user'; // Adjust the import path as needed
import AppError from '../utils/appError'; // Adjust the import path to where you saved appError.ts

export const loginService = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError(404, 'User not found'); // Throwing custom error
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        throw new AppError(401, 'Incorrect password'); // Throwing custom error
    }

    return { user };
};
