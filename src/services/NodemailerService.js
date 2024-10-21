// src/services/NodemailerService.js

const nodemailer = require('nodemailer');
const EmailService = require('./EmailService');
require('dotenv').config(); // Load environment variables from .env file

class NodemailerService extends EmailService {
    constructor() {
        super();
        this.transporter = nodemailer.createTransport({
            service: 'gmail', // Your email service
            auth: {
                user: process.env.EMAIL_USER, // Email from .env
                pass: process.env.EMAIL_PASS,  // Password from .env
            },
        });
    }

    async sendEmail(to, cc, subject, text) {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            cc,
            subject,
            text,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Email sent to: ${to} with CC: ${cc}`);
            return { success: true };
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send email with Nodemailer');
        }
    }
}

module.exports = NodemailerService;
