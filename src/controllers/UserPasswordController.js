// controllers/UserController.js
const { postUserPasswordToDB } = require('../database/UserPasswordDatabase');

// Add a new user
const postPasswordUser = async (req, res) => {
  try {
    const newUser = req.body;  // Get user data from request body
    postUserPasswordToDB(newUser, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Failed to add user' });
      } else {
        res.status(201).json({ message: 'User created successfully', user: result });
      }
    });
  } catch (err) {
    console.error('Error adding user:', err);
    res.status(500).json({ error: 'Failed to add user' });
  }
};

module.exports = { postPasswordUser };
