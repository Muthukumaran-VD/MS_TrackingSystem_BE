const { getAllUsersFromDB} = require('../database/UserDatabase');
// Get all users with pagination and search
// Get all users with pagination and search
const getAllUsers = async (req, res) => {
    try {
        const { page = 1, limit = 8, search = '', all = false } = req.query;

        getAllUsersFromDB(search, page, limit, (err, users) => {
            if (err) {
                res.status(500).json({ error: 'Failed to retrieve data' });
            } else {
                res.json({
                    users,
                    totalPages: all ? 1 : Math.ceil(users.length / limit),
                    currentPage: parseInt(page),
                    totalUsers: users.length,
                });
            }
        });
    } catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Failed to retrieve data' });
    }
};

module.exports = { getAllUsers};