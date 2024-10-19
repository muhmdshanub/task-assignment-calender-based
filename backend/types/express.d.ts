import * as express from 'express';
import { IUser } from '../models/user'; // Adjust the import path

declare global {
    namespace Express {
        interface Request {
            user?: IUser; // Adding the user property
        }
    }
}
