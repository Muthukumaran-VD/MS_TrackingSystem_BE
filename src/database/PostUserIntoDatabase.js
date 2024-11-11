

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

module.exports = { postUserToDB };