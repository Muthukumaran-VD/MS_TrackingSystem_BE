const { Listmsaccounttracking } = require('../models/user.model');

// The getAllUsers function retrieves users from the database with optional search and pagination, 
// returning the users along with pagination metadata or all users if requested.

const getAllUsers = async (req, res) => {
    try {
        const { page = 1, limit = 8, search = '', all = false } = req.query;

        const searchQuery = search ? {
            $or: [
                { Resource_Name: { $regex: search, $options: 'i' } },
                { Client_Partner: { $regex: search, $options: 'i' } },
                { V_Account: { $regex: search, $options: 'i' } },
            ]
        } : {};

        let users;
        let totalUsers;

        if (all) {
            // Fetch all users without pagination
            users = await Listmsaccounttracking.find(searchQuery);
            totalUsers = users.length;
        } else {
            // Fetch users with pagination
            const skip = (page - 1) * limit;
            users = await Listmsaccounttracking.find(searchQuery)
                .skip(skip)
                .limit(parseInt(limit));
            totalUsers = await Listmsaccounttracking.countDocuments(searchQuery);
        }

        res.json({
            users,
            totalPages: all ? 1 : Math.ceil(totalUsers / limit),
            currentPage: parseInt(page),
            totalUsers
        });
    } catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Failed to retrieve data' });
    }
};

// The postUser function creates and saves a new user document to the database, responding with the created user or an error message.
const postUser = async (req, res) => {
    try {
        const newData = new Listmsaccounttracking(req.body);
        await newData.save();
        res.status(201).json(newData);
    } catch (err) {
        console.error('Error adding data:', err);
        res.status(500).json({ error: 'Failed to add data' });
    }
}

module.exports = { getAllUsers, postUser }