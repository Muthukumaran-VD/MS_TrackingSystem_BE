//config/DatabaseConfig.js

const mysql = require('mysql2');
require('dotenv').config();

const connectDB = () => {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    connection.connect(err => {
        if (err) {
            console.error('Failed to connect to MySQL:', err);
        } else {
            console.log('Connected to MySQL Database');
        }
    });

    global.db = connection; // Make the connection available globally
};

module.exports = { connectDB };