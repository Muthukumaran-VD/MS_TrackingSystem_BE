// src/services/NodemailerService.js

const nodemailer = require('nodemailer');
const EmailService = require('./EmailService');
require('dotenv').config(); // Load environment variables from .env file

class NodemailerService extends EmailService {
    constructor() {
        super();
        // Create a transporter to send emails using Gmail service
        this.transporter = nodemailer.createTransport({
            service: 'gmail', // Email service (Gmail in this case)
            auth: {
                user: process.env.EMAIL_USER, // Your Gmail address from .env
                pass: process.env.EMAIL_PASS,  // Your Gmail password from .env
            },
        });
    }

    // Generic send email function
    async sendEmail(to, cc, subject, text) {
        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender email (configured in .env)
            to,  // Recipient email
            cc,  // CC recipients
            subject, // Subject line
            text, // Email body content
        };

        try {
            // Sending the email
            await this.transporter.sendMail(mailOptions);
            console.log(`Email sent to: ${to} with CC: ${cc}`);
            return { success: true };
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send email with Nodemailer');
        }
    }

    // Function to send BGV request email
    async sendBGVRequestEmail(to, cc) {
        const subject = "Request for BGV"; // Subject for BGV email
        const text = `
            I have initiated BGV on HireRight. You must have received an email to complete further details and submit your profile. Please confirm once this is done.

            Form link: http://localhost:3000/bgv-employeeform
        `; // Text body for BGV email

        // Use the generic sendEmail function to send the BGV email
        return this.sendEmail(to, cc, subject, text);
    }
}

module.exports = NodemailerService;
