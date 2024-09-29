const { getAllUsersFromDB, postUserToDB } = require('../models/user.model');

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
                    totalUsers: users.length
                });
            }
        });
    } catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Failed to retrieve data' });
    }
};

// Add a new user
const postUser = async (req, res) => {
    try {
        const newData = req.body;

        postUserToDB(newData, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Failed to add data' });
            } else {
                res.status(201).json({ id: result.insertId, ...newData });
            }
        });
    } catch (err) {
        console.error('Error adding data:', err);
        res.status(500).json({ error: 'Failed to add data' });
    }
};

module.exports = { getAllUsers, postUser };
