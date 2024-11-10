// services/HashingService.js
const bcrypt = require('bcryptjs');

// Function to hash a password
const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);  // Generate a salt
    const hashedPassword = await bcrypt.hash(password, salt);  // Hash the password
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing the password');
  }
};

// Function to compare a plaintext password with a hashed password
const comparePassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};

module.exports = { hashPassword, comparePassword };
