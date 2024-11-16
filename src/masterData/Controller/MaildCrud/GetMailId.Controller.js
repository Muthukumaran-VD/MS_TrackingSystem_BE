// controllers/emailController.js
const { getAllEmails } = require('../../database/MaildCrud/GetMaild.db');

// Controller function to get all emails
const getAllEmailIds = async (req, res) => {
    try {
        const emails = await getAllEmails();  // Fetch all emails from the database
        
        if (emails.length === 0) {
            return res.status(404).json({ error: 'No emails found' });
        }
        
        res.status(200).json({
            message: 'All emails retrieved successfully',
            emails: emails  // Send all email records in the response
        });
    } catch (error) {
        console.error('Error fetching emails:', error);
        res.status(500).json({ error: 'Failed to fetch emails' });
    }
};

module.exports = { getAllEmailIds };