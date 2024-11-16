// controllers/UserController.js
const NodemailerService = require('../../services/NodemailerService');
const { insertEmailData } = require('../../database/employee/PostUserMaild');
const emailService = new NodemailerService();

const sendEmailHandler = async (req, res) => {
    const { to, cc, formData } = req.body;
    console.log(formData);

    try {
        // Step 1: Send the email
        const emailResult = await emailService.sendBGVRequestEmail(to, cc);
        if (emailResult.success) {
            // Step 2: Insert the email and form data into the database
            const newId = await insertEmailData(formData);
            res.status(200).json({ message: 'BGV email sent and data stored successfully', id: newId });
        } else {
            res.status(500).json({ error: 'Failed to send BGV email' });
        }
    } catch (error) {
        console.error('Error in sendEmailHandler:', error);
        res.status(500).json({ error: 'Error processing the email and storing data' });
    }
};

module.exports = { sendEmailHandler };
