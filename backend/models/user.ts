import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the User interface
export interface IUser extends Document {
  _id: mongoose.Types.ObjectId; 
  name: string;
  email: string;
  password: string; // Ensure to hash passwords
  role: 'Employee' | 'Manager'; // Role can either be Employee or Manager
  manager?: mongoose.Types.ObjectId; // Reference to the manager's User ID
  createdAt: Date;
  updatedAt: Date;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

// Define the User schema
const UserSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Employee', 'Manager'],
    default: 'Employee',
  },
  manager: {
    type: mongoose.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: function (this: IUser) {
      return this.role === 'Employee'; // Only Employees should have a manager
    },
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Hash the password before saving the user
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Add a method to compare passwords
UserSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Index for faster email lookups
UserSchema.index({ email: 1 });

// Create the User model
const User = mongoose.model<IUser>('User', UserSchema);

export default User;
