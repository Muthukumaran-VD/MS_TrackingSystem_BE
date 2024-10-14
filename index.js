const express = require('express');
const cors = require('cors');
const userRoute = require('./routes/user.route');
const { connectDB } = require('./config/db.config'); // Import MySQL connection

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
    res.status(201).json({ Message: 'Healthy request' });
});

app.use('/users', userRoute);
