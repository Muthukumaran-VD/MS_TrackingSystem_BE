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


// Modify the postUserToDB function to use the model for validation
const postUserToDB = (userData, callback) => {
    // Validate the fields based on the model
    const errors = [];
    
    Object.keys(UserModel).forEach(key => {
        if (!userData[key] && UserModel[key].type !== 'VARCHAR(255)') {
            errors.push(`${key} is required`);
        }
    });

    if (errors.length > 0) {
        return callback({ error: errors.join(', ') }, null);
    }

    // Generate new ID logic (as before)
    const getLastIdQuery = `SELECT ID FROM listmsaccounttrackings WHERE ID LIKE 'ID%' ORDER BY ID DESC LIMIT 1`;

    global.db.query(getLastIdQuery, (err, result) => {
        if (err) {
            return callback(err, null);
        }

        // Continue as before with ID creation and insertion
        let newId;
        if (result.length > 0) {
            const lastId = result[0].ID;
            const lastNum = parseInt(lastId.slice(2), 10);
            newId = `ID${String(lastNum + 1).padStart(3, '0')}`;
        } else {
            newId = 'ID001';
        }

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

// Function to update an existing user in the database by ID
const updateUserInDB = async (userId, updatedData) => {
    return new Promise((resolve, reject) => {
        // Ensure the ID and updated data are provided
        if (!userId || !updatedData) {
            return reject({ error: 'User ID and updated data are required' });
        }

        // Build the SET part of the SQL query dynamically based on the keys in updatedData
        const setFields = Object.keys(updatedData)
            .map(key => `${key} = ?`) // Map each field to "key = ?"
            .join(', '); // Join them with commas

        // Build the SQL query
        const query = `UPDATE listmsaccounttrackings SET ${setFields} WHERE ID = ?`;

        // Get the values from updatedData and add the userId at the end (for WHERE clause)
        const values = [...Object.values(updatedData), userId];

        // Execute the update query
        db.query(query, values, (err, result) => {
            if (err) {
                // Log error to console for debugging
                console.error('Database query error:', err);
                return reject(err);
            }

            // Return the result of the update
            resolve(result);
        });
    });
};

module.exports = { getAllUsersFromDB, postUserToDB, updateUserInDB };
