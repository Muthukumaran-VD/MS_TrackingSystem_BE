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

    // Generic send email function
    async sendEmail(to, cc, subject, htmlContent, attachments = []) {
        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender email (configured in .env)
            to,  // Recipient email
            cc,  // CC recipients
            subject, // Subject line
            html: htmlContent, // Email body content in HTML format
            attachments, // Attachments array
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

    // Function to send Aadhar email with document attachment
    async sendAadharEmail(to, cc, formData, aadharDocument) {
        const subject = "Aadhar Document Submission for BGV";
        const htmlContent = `
            <h3>Aadhar Document Submission for BGV</h3>
            <p>First Name : ${formData.firstName}</p>
            <p>Middle Name : ${formData.middleName}</p>
            <p>Last Name : ${formData.lastName}</p>
            <p>Legal Name as per Govt ID : ${formData.legalName}</p>
            <p>Title : ${formData.title}</p>
            <p>Manager(internal) : ${formData.manager}</p>
            <p>Personal Cell Phone : ${formData.personalCell}</p>
            <p>Personal Email : ${formData.personalEmail}</p>
            <p>Country in which they work : ${formData.country}</p>
            <p>StartDate : ${formData.startDate}</p>
            <p>EndDate : ${formData.endDate}</p>
            <p>Team/Project : ${formData.team}</p>
            <p>Sub-Geo : ${formData.subGeo}</p>
            <p>Best regards,</p>
            <h3>${formData.firstName}</h3>
        `;

        const attachments = [
            {
                filename: aadharDocument.originalname || 'AadharDocument.pdf', // Default filename if not provided
                path: aadharDocument.path, // Temporary file path for attachment
            },
        ];
        return this.sendEmail(to, cc, subject, htmlContent, attachments);
    }
}

module.exports = NodemailerService;
