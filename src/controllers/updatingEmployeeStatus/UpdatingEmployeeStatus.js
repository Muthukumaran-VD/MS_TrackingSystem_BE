const { updateUserStatusId, checkUserById } = require('../../database/updaingUserStatus/UpdatingUserStatus');
const NodemailerService = require("../../services/NodemailerService");

// Email Templates
const emailTemplates = {
    "Setup System": {
        subject: "Setup System - Action Required",
        htmlContent: (name, project) => `
            <h3>Dear Team,</h3>
            <p>The setup system has been initiated for ${name} (Project: ${project}). Please complete the necessary steps to proceed.</p>
            <p>Regards,</p>
            <p>Your Team</p>
        `,
    },
    "Credentials Received": {
        subject: "Credentials Received - Action Required",
        htmlContent: (name, project) => `
            <h3>Dear Team,</h3>
            <p>The credentials for ${name} (Project: ${project}) have been received. Please proceed with the next steps.</p>
            <p>Regards,</p>
            <p>Your Team</p>
        `,
    },
    "SCOC Training Completed": {
        subject: "SCOC Training Completed - Action Required",
        htmlContent: (name, project) => `
            <h3>Dear Team,</h3>
            <p>The SCOC training has been completed for ${name} (Project: ${project}). Please follow up with the next steps.</p>
            <p>Regards,</p>
            <p>Your Team</p>
        `,
    },
    "ECA Initiated": {
        subject: "ECA Initiated - Action Required",
        htmlContent: (name, project) => `
            <h3>Dear Team,</h3>
            <p>The ECA process has been initiated for ${name} (Project: ${project}). Please take the necessary actions.</p>
            <p>Regards,</p>
            <p>Your Team</p>
        `,
    },
    "BGV Completed": {
        subject: "BGV Completed - Action Required",
        htmlContent: (name, project) => `
            <h3>Dear Team,</h3>
            <p>The BGV process has been completed for ${name} (Project: ${project}). Please take the next actions.</p>
            <p>Regards,</p>
            <p>Your Team</p>
        `,
    },
    "BGV Submitted": {
        subject: "BGV Submitted - Action Required",
        htmlContent: (name, project) => `
            <h3>Dear Team,</h3>
            <p>The BGV details have been submitted for ${name} (Project: ${project}). Please review and process.</p>
            <p>Regards,</p>
            <p>Your Team</p>
        `,
    },
    "BGV Initiated": {
        subject: "BGV Submitted - Action Required",
        htmlContent: (name, project) => `
            <h3>Dear Team,</h3>
            <p>The BGV details have been submitted for ${name} (Project: ${project}). Please review and process.</p>
            <p>Regards,</p>
            <p>Your Team</p>
        `,
    },
    "ECA Shared": {
        subject: "ECA Shared - Action Required",
        htmlContent: (name, project) => `
            <h3>Dear Team,</h3>
            <p>The ECA details have been shared for ${name} (Project: ${project}). Please follow up as required.</p>
            <p>Regards,</p>
            <p>Your Team</p>
        `,
    },
};

// Update user status and send email based on status
const updateUserStatus = async (req, res) => {
    const { userId } = req.params;
    console.log(req.params)
    const { toEmails, ccEmails, name, project, status, statusUpdatingDate } = req.body;
    
    // The screenshot file is available in req.file (from multer)
    const document = req.file;

    console.log('Form Data:', req.body);
    console.log('document:', document);

    try {
        // Check if the user exists in the database
        const userExists = await checkUserById(userId);
        if (!userExists) {
            return res.status(404).json({ message: 'User ID not found.' });
        }

        // Get email template for the current status
        const template = emailTemplates[status];
        if (template) {
            // Ensure toEmails and ccEmails are arrays
            const to = Array.isArray(toEmails) ? toEmails.join(', ') : toEmails; // If not an array, use as is
            const cc = Array.isArray(ccEmails) ? ccEmails.join(', ') : ccEmails; // If not an array, use as is
            const subject = template.subject;
            const htmlContent = template.htmlContent(name, project);  // Generate dynamic HTML content

            // Handle screenshot attachment
            const attachments = document ? [
                {
                    filename: document.originalname,
                    path: document.path,  // Assuming you saved it to the disk
                    contentType: document.mimetype,  // MIME type for the attachment
                },
            ] : [];

            // Instantiate NodemailerService and send email
            const nodemailerService = new NodemailerService();
            await nodemailerService.sendEmail(to, cc, subject, htmlContent, attachments);
        } else {
            console.error('No email template found for the status:', status);
        }

        // Update the user status in the database
        const result = await updateUserStatusId(userId, status, statusUpdatingDate);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Status updated successfully.' });
        } else {
            res.status(500).json({ message: 'Failed to update status.' });
        }
    } catch (error) {
        console.error('Error updating user status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    updateUserStatus,
};
