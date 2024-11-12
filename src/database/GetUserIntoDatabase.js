const getAllUsersFromDB = (searchQuery, page, limit, callback) => {
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM listmsaccounttrackings WHERE 1=1'; // Basic query

    // Use template literals for string interpolation
    if (searchQuery) {
        query += ` AND (Resource_Name LIKE '%${searchQuery}%' OR Client_Partner LIKE '%${searchQuery}%' OR V_Account LIKE '%${searchQuery}%')`;
    }

    query += ` LIMIT ${limit} OFFSET ${offset}`;

    // Execute the query to get the users for the current page
    global.db.query(query, (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
};

// Function to get total users count based on the search query
const getTotalUsersCount = (searchQuery) => {
    return new Promise((resolve, reject) => {
        let query = 'SELECT COUNT(*) AS total FROM listmsaccounttrackings WHERE 1=1';

        if (searchQuery) {
            query += ` AND (Resource_Name LIKE '%${searchQuery}%' OR Client_Partner LIKE '%${searchQuery}%' OR V_Account LIKE '%${searchQuery}%')`;
        }

        // Execute the query to get the total count of users
        global.db.query(query, (err, results) => {
            if (err) {
                reject('Error fetching total user count');
                return;
            }
            resolve(results[0].total);
        });
    });
};

module.exports = { getAllUsersFromDB, getTotalUsersCount };
