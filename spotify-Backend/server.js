import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './src/config/mongodb.js';
import songRouter from './src/routes/songRoute.js';
import albumRouter from './src/routes/albumRoute.js';
import connectedCloudinary from './src/config/cloudinary.js';

const app = express();
const port = process.env.PORT || 4000;

// Connect to DB and Cloudinary
connectDB();
connectedCloudinary();

// Middleware
app.use(express.json());
app.use(cors());

// API Endpoints
app.use('/api/songs', songRouter);
app.use('/api/albums', albumRouter);

// Test route
app.get('/', (req, res) => res.json({ status: 'API Working' }));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});