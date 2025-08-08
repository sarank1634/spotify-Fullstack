import mongoose from "mongoose";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '../../.env' });

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }

        console.log('Connecting to MongoDB...');
        
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connected successfully');
        
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });
        
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        // Exit process with failure
        process.exit(1);
    }
};

export default connectDB;