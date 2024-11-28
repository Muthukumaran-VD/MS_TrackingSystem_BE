const NodemailerService = require('../../services/NodemailerService');
const { insertEmailData, updateEmployeeData } = require('../../database/employee/PostUserMaild');
const emailService = new NodemailerService();
const fs = require('fs');

const sendEmailHandler = async (req, res) => {
    const { to, cc, formData } = req.body;
    console.log(formData);

    try {
        const newId = await insertEmailData(formData);
        const emailResult = await emailService.sendBGVRequestEmail(to, cc, newId);
        if (emailResult.success) {
            res.status(200).json({ message: 'BGV email sent and data stored successfully', id: newId });
        } else {
            res.status(500).json({ error: 'Failed to send BGV email' });
        }
    } catch (error) {
        console.error('Error in sendEmailHandler:', error);
        res.status(500).json({ error: 'Error processing the email and storing data' });
    }
};



const sendEmailAndUpdateData = async (req, res) => {
    try {
        const formData = JSON.parse(req.body.data); // Parse form data
        const aadharDocument = req.file; // Uploaded Aadhar document
        if (!aadharDocument) {
            return res.status(400).json({ error: 'Aadhar document is required' });
        }

        const { toEmail, ccEmail, ...employeeData } = formData;

        // Send email with Aadhar document
        const emailResult = await emailService.sendAadharEmail(
            toEmail,
            ccEmail,
            employeeData,
            aadharDocument
        );

        // Clean up the uploaded file after sending the email
        fs.unlinkSync(aadharDocument.path);

        if (!emailResult.success) {
            return res.status(500).json({ error: 'Failed to send email' });
        }

        // Update employee data in the database
        const updateResult = await updateEmployeeData(employeeData);
        if (!updateResult.success) {
            return res.status(500).json({ error: 'Failed to update employee data' });
        }

        res.status(200).json({ message: 'Email sent and data updated successfully' });
    } catch (error) {
        console.error('Error in sendEmailAndUpdateData:', error);
        res.status(500).json({ error: 'Error processing request' });
    }
};



module.exports = { sendEmailHandler, sendEmailAndUpdateData };
