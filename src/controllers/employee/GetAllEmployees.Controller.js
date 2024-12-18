const { getTotalUsersCount, getAllUsersEmployeeFromDB } = require('../../database/employee/GetUserIntoDatabase');

// Get all users with pagination and search
const getAllUsers = async (req, res) => {
    try {
        const { page = 1, limit = 8, search = '', all = false } = req.query;

        // Fetch the total number of users that match the search
        const totalUsers = await getTotalUsersCount(search);

        // Fetch users based on pagination and search
        getAllUsersEmployeeFromDB(search, page, limit, (err, users) => {
            if (err) {
                res.status(500).json({ error: 'Failed to retrieve data' });
            } else {
                res.json({
                    users,
                    totalPages: all ? 1 : Math.ceil(totalUsers / limit),
                    currentPage: parseInt(page),
                    totalUsers,  // Total count of users from the DB
                });
            }
        });
    } catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Failed to retrieve data' });
    }
};


module.exports = { getAllUsers };
