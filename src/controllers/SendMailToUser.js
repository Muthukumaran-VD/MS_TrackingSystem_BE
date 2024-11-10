// controllers/UserController.js
const NodemailerService = require('../services/NodemailerService'); // Use Nodemailer

// Choose the email service
const emailService = new NodemailerService(); // Change to new AzureMailService() to use Azure


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

module.exports = { sendEmailHandler };
