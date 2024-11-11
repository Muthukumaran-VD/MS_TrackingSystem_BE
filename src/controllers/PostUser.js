const { postUserToDB } = require('../database/PostUserIntoDatabase');
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

module.exports = { postUser };
