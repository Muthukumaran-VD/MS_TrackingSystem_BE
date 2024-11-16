const { updateUserInDB } = require('../../database/employee/UpdateUserIntoDatabase');
// Function to update an existing user in the database by ID
const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;  // Get user ID from the URL params
        const updatedData = req.body;   // Get the updated data from the request body

        // Check if there is updated data
        if (Object.keys(updatedData).length === 0) {
            return res.status(400).json({ error: 'No data to update' });
        }

        console.log(updatedData); // Log the updated data (for debugging purposes)

        // Call the function to update the user in the database
        const result = await updateUserInDB(userId, updatedData);
        
        // If the update was successful, return the result
        res.status(200).json({ message: 'User updated successfully', result });

    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ error: 'Error updating user', details: err.message });
    }
};

module.exports = { updateUser};
