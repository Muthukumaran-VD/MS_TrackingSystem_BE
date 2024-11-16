const { saveEmail } = require("../../database/MaildCrud/PostMaild.db");

// controllers/emailController.js
const postMailId = async (req, res) => {
    const { mailTo, ccMail } = req.body;

    try {
        const insertId = await saveEmail(mailTo, ccMail);  // Insert email and get the auto-generated sno
        res.status(200).json({
            message: 'Email details saved successfully',
            sno: insertId // Return the auto-generated sno (insertId)
        });
    } catch (error) {
        console.error('Error saving email:', error);
        res.status(500).json({ error: 'Failed to save email details' });
    }
};

module.exports = { postMailId };
