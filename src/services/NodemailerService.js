const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const EmailService = require('./EmailService');

require('dotenv').config(); // Load environment variables from .env file

class NodemailerService extends EmailService {
    constructor() {
        super();
        // Create a transporter to send emails using Gmail service
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: false, // Uses STARTTLS instead of SSL/TLS
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }

    // Generic send email function
    async sendEmail(to, cc, subject, htmlContent) {
        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender email (configured in .env)
            to,  // Recipient email
            cc,  // CC recipients
            subject, // Subject line
            html: htmlContent, // Email body content in HTML format
        };

        try {
            // Sending the email
            await this.transporter.sendMail(mailOptions);
            return { success: true };
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send email with Nodemailer');
        }
    }

    // Function to send BGV request email with dynamic content, including ID in URL
    async sendBGVRequestEmail(to, cc, newId) {
        const subject = "Request for BGV"; // Subject for BGV email

        // Step 1: Read the HTML template
        const templatePath = path.join(__dirname, '../services/SendBGVFromMailTemplate/BGVEmailTemplate.html');
        let htmlContent = fs.readFileSync(templatePath, 'utf-8');

        // Step 2: Replace placeholders with dynamic values
        const currentYear = new Date().getFullYear();
        htmlContent = htmlContent.replace('{{to}}', to);
        htmlContent = htmlContent.replace('{{newId}}', newId);
        htmlContent = htmlContent.replace('{{year}}', currentYear);

        // Step 3: Use the generic sendEmail function to send the email
        return this.sendEmail(to, cc, subject, htmlContent);
    }
}

module.exports = NodemailerService;
