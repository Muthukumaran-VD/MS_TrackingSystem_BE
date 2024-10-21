// index.js

const express = require('express');
const cors = require('cors');
const userRoute = require('./src/routes/UserRoutes');
const { connectDB } = require('./src/config/database');
require('dotenv').config(); // Load environment variables from .env file

// Set up Express
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// Connect to MySQL Database
connectDB();

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Define the GET endpoint
app.get('/', async (req, res) => {
    res.status(201).json({ Message: 'Backend Running' });
});

// Use user routes
app.use('/users', userRoute);

