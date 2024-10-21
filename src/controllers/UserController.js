// controllers/UserController.js

const { getAllUsersFromDB, postUserToDB } = require('../models/User');
const NodemailerService = require('../services/NodemailerService'); // Use Nodemailer
// const AzureMailService = require('../services/AzureMailService'); // Uncomment to use Azure Mail Service

// Choose the email service
const emailService = new NodemailerService(); // Change to new AzureMailService() to use Azure

// Get all users with pagination and search
// Get all users with pagination and search
const getAllUsers = async (req, res) => {
    try {
        const { page = 1, limit = 8, search = '', all = false } = req.query;

        getAllUsersFromDB(search, page, limit, (err, users) => {
            if (err) {
                res.status(500).json({ error: 'Failed to retrieve data' });
            } else {
                res.json({
                    users,
                    totalPages: all ? 1 : Math.ceil(users.length / limit),
                    currentPage: parseInt(page),
                    totalUsers: users.length,
                });
            }
        });
    } catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Failed to retrieve data' });
    }
};

// Add a new user
const postUser = async (req, res) => {
    try {
        const newData = req.body;

        postUserToDB(newData, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Failed to add data' });
            } else {
                res.status(201).json({ id: result.insertId, ...newData });
            }
        });
    } catch (err) {
        console.error('Error adding data:', err);
        res.status(500).json({ error: 'Failed to add data' });
    }
};

// Send email function
const sendEmailHandler = async (req, res) => {
    const { to, cc } = req.body; // Get the email addresses from the request body
    console.log('Received email:', { to, cc }); // Print email to the console

    try {
        await emailService.sendEmail(to, cc, 'BGV Request', 'This is a test email for the BGV Request.');
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
};

module.exports = { getAllUsers, postUser, sendEmailHandler };
