import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import songRouter from './spotify-Backend/routes/songRoute.js';

//app config
const app = express();
const port = process.env.PORT || 4000;

//middleware 
app.use(express.json());
app.use(cors());

// initializing routes 
app.use('api/song',songRouter);


app.get('/', (req, res) => res.send("API Working"));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});