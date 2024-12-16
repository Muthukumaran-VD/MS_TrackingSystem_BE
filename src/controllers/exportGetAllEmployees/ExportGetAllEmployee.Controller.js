const { getExportAllEmployeeFromDB } = require("../../database/exportGetAllEmployee/ExportGetAllEmployee.Db");



// Get all users without pagination and search
const getexportAllUsers = async (req, res) => {
    try {
        // Fetch all users directly from the database
        getExportAllEmployeeFromDB((err, users) => { // Simplified to only fetch all users
            if (err) {
                res.status(500).json({ error: 'Failed to retrieve data' });
            } else {
                res.json({
                    users, // Send all users to the frontend
                    totalUsers: users.length, // Total number of users
                });
            }
        });
    } catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Failed to retrieve data' });
    }
};

module.exports = { getexportAllUsers };
