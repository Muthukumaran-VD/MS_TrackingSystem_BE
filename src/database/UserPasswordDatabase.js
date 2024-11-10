// src/database/UserPasswordDatabase.js
const { hashPassword } = require('../services/HashingPasswordService');

// Function to create the 'users' table if it doesn't exist
const createUsersTableIfNotExists = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    )
  `;

  // Use global.db directly to access the database connection
  global.db.query(createTableQuery, (err, result) => {
    if (err) {
      console.error('Error creating users table:', err);
    } else {
      console.log('Users table is ready.');
    }
  });
};

const postUserPasswordToDB = async (userData, callback) => {
  try {
    // Hash the password before saving it to the database
    const hashedPassword = await hashPassword(userData.password);

    const query = `INSERT INTO users (email, password) VALUES (?, ?)`;
    global.db.query(query, [userData.email, hashedPassword], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { id: result.insertId, email: userData.email });
      }
    });
  } catch (err) {
    callback(err, null);
  }
};

module.exports = { createUsersTableIfNotExists, postUserPasswordToDB };
