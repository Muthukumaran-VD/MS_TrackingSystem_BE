// No schema is required here, but we'll use a MySQL query function.

const getAllUsersFromDB = (searchQuery, page, limit, callback) => {
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM listmsaccounttrackings WHERE 1=1'; // Basic query

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

const postUserToDB = (userData, callback) => {
    const query = `INSERT INTO listmsaccounttrackings SET ?`;

    global.db.query(query, userData, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

module.exports = { getAllUsersFromDB, postUserToDB };
