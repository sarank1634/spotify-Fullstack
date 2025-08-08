import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Configure __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file in the root directory
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Import routes and DB connection after env is loaded
import songRouter from './spotify-Backend/src/routes/songRoute.js';
import connectDB from './spotify-Backend/src/config/mongodb.js';
import connectedCloudinary from './spotify-Backend/src/config/cloudinary.js';

// App config
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());
connectedCloudinary();
// Initialize routes
app.use('/api/song', songRouter);

// Test route
app.get('/', (req, res) => res.json({ status: 'API Working' }));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Connect to MongoDB and start server
const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();