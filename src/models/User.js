// models/User.js

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

const postUserToDB = (userData, callback) => {
    // First, retrieve the last inserted ID from the table
    const getLastIdQuery = `SELECT ID FROM listmsaccounttrackings WHERE ID LIKE 'ID%' ORDER BY ID DESC LIMIT 1`;

    global.db.query(getLastIdQuery, (err, result) => {
        if (err) {
            return callback(err, null);
        }

        // Extract the numeric part of the last ID and increment it
        let newId;
        if (result.length > 0) {
            // If there is an existing ID, extract the numeric part and increment it
            const lastId = result[0].ID; // e.g., "ID005"
            const lastNum = parseInt(lastId.slice(2), 10); // extract "005" and convert to integer
            newId = `ID${String(lastNum + 1).padStart(3, '0')}`; // Increment and pad to 3 digits, e.g., "ID006"
        } else {
            // If no existing ID, start with the first ID
            newId = 'ID001';
        }

        // Add the new ID to userData and insert it into the database
        const insertQuery = `INSERT INTO listmsaccounttrackings (ID, VueData_Email) VALUES (?, ?)`;

        global.db.query(insertQuery, [newId, userData.VueData_Email], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, { id: newId, ...userData });
            }
        });
    });
};



module.exports = { getAllUsersFromDB, postUserToDB };
