import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import songRouter from './src/routes/songRoute.js';
import connectDB from './src/config/mongodb.js';
import connectedCloudinary from './src/config/cloudinary.js';
import albumRouter from './src/routes/albumRoute.js';

// App config
const app = express();

// ES module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, './.env') });

const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        const parts = [
            `[${new Date().toISOString()}]`,
            req.method,
            req.originalUrl,
            `-> ${res.statusCode}`,
            `(${duration}ms)`
        ];
        console.log(parts.join(' '));
        if (Object.keys(req.query || {}).length) {
            console.log('  query:', req.query);
        }
        if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
            console.log('  body :', req.body);
        }
    });
    next();
});
connectedCloudinary();
connectDB();
// API Endpoints
app.use('/api/song', songRouter);
app.use('/api/album', albumRouter);

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