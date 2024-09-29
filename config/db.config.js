const mysql = require('mysql2');

const connectDB = () => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Root',
        database: 'msaccounttracking', // Replace with your database name
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
