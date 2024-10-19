import jwt from 'jsonwebtoken';
import { Response } from 'express';
import dotenv from 'dotenv';


dotenv.config()

const createTokenAndSetCookie = (userId: string, res: Response) => {
    
    const token = jwt.sign({ userId }, process.env.USER_JWT_SECRET!, { expiresIn: '1h' });

    // Set JWT as a cookie in the response
    res.cookie('user_Jwt', token, {
        httpOnly: true,        // Prevents client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === 'production', // Ensure cookies are sent over HTTPS in production
        sameSite: 'strict',    // Helps with CSRF protection
        maxAge: 60 * 60 * 1000, // 1 hour expiration (in ms)
    });

};

export default createTokenAndSetCookie;
