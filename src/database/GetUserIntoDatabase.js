// database/UserDatabase.js

const getAllUsersFromDB = (searchQuery, page, limit, callback) => {
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM listmsaccounttrackings WHERE 1=1'; // Basic query

    // Use template literals for string interpolation
    if (searchQuery) {
        query += ` AND (Resource_Name LIKE '%${searchQuery}%' OR Client_Partner LIKE '%${searchQuery}%' OR V_Account LIKE '%${searchQuery}%')`;
    }

    query += ` LIMIT ${limit} OFFSET ${offset}`;

    // Execute the query
    global.db.query(query, (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
};

module.exports = { getAllUsersFromDB };