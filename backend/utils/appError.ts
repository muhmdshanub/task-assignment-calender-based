class AppError extends Error {
    public statusCode: number;
    public details?: any;

    constructor(statusCode: number, message: string, details?: any) {
        super(message);
        this.statusCode = statusCode;
        this.details = details; // Store validation details if provided
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;
