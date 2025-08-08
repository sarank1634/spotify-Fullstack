import mongoose from "mongoose";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Configure __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the root .env file
const envPath = path.resolve(process.cwd(), '.env');
dotenv.config({ path: envPath });

// Debug: Log the environment variables
console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Found' : 'Not found');

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI;
        
        if (!mongoUri) {
            console.error('MONGODB_URI is not defined in environment variables');
            console.log('Current working directory:', process.cwd());
            console.log('Environment file path:', envPath);
            throw new Error('MongoDB connection string is required');
        }

        console.log('Connecting to MongoDB...');
        
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // 5 seconds timeout
        });

        console.log('MongoDB connected successfully');
        
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });
        
        return mongoose.connection;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        console.error('Stack:', error.stack);
        // Exit process with failure
        process.exit(1);
    }
};

export default connectDB;