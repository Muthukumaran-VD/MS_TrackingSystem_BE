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

module.exports = { updateUserInDB };
