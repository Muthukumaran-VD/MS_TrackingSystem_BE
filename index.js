const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/user.route');
const cors = require('cors');

// The code sets up an Express server with CORS and JSON middleware, connects to MongoDB Atlas, and starts the server on port 5001.
// It defines a basic GET endpoint and sets up routing for user-related requests through the `userRoute` module.

// Set up Express
const app = express();
const port = 5001;

app.use(cors());
app.use(express.json())

// Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://Vuedata:uMjRKdhyO8eqw46J@cluster0.h665i.mongodb.net/msaccounttracking?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Failed to connect to MongoDB Atlas', err));

//
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Define the GET endpoint
app.get('/', async (req, res) => {
    res.status(201).json({ Message: 'Healthy request' });
});

app.use('/users', userRoute)
