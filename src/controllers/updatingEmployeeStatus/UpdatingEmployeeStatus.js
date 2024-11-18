const { updateUserStatusId, checkUserById } = require('../../database/updaingUserStatus/UpdatingUserStatus');

const updateUserStatus = async (req, res) => {
    const { userId, status } = req.body;
    try {
        const userExists = await checkUserById(userId);
        if (!userExists) {
            return res.status(404).json({ message: 'User ID not found.' });
        }

        // Now the result from 'updateUserStatusId' contains 'affectedRows'
        const result = await updateUserStatusId(userId, status);

        // Check if the 'affectedRows' is greater than 0
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