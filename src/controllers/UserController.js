// controllers/UserController.js

const { getAllUsersFromDB, postUserToDB } = require('../models/User');
const NodemailerService = require('../services/NodemailerService'); // Use Nodemailer

// Choose the email service
const emailService = new NodemailerService(); // Change to new AzureMailService() to use Azure

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

// Send email function with database storage
const sendEmailHandler = async (req, res) => {
    const { to, cc } = req.body; // Get the email addresses from the request body
    console.log('Received email:', { to, cc }); // Print email to the console

    // Define the subject and body text of the email
    const subject = 'BGV Request';
    const text = 'I have initiated BGV on HireRight. You must have received an email to complete further details and submit your profile. Please confirm once this is done. Form Link: http://localhost:3000/bgv-request';

    try {
        // Send the email using the email service
        await emailService.sendEmail(to, cc, subject, text);

        // After successfully sending the email, store the "to" email address in the database
        postUserToDB({ VueData_Email: to }, (err, result) => { // Use the correct column name
            if (err) {
                console.error('Error saving email to database:', err);
                return res.status(500).json({ error: 'Failed to send email and save to database' });
            }
            res.status(200).json({ message: 'Email sent and recipient stored successfully' });
        });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
};

module.exports = { getAllUsers, postUser, sendEmailHandler };
