// Function to check if user exists by userId in the listmsaccounttrackings table
const checkUserById = async (userId) => {
    try {
        const query = `
            SELECT ID 
            FROM listmsaccounttrackings 
            WHERE ID = ?
        `;
        const [rows] = await db.promise().query(query, [userId]);  // This will now return a promise
        return rows.length > 0; // Returns true if user exists
    } catch (error) {
        console.error("Error checking user by ID:", error);
        throw new Error("Error checking user by ID");  // Throw a custom error if something goes wrong
    }
};

const updateUserStatusId = async (userId, status) => {
    try {
        const query = ` 
            UPDATE listmsaccounttrackings 
            SET BGV_Request_status = ? 
            WHERE ID = ?
        `;
        // Execute the query with status and userId as parameters (this returns a promise now)
        const [result] = await db.promise().query(query, [status, userId]);
        // Return the result so the controller can access 'affectedRows'
        return result;
    } catch (error) {
        console.error("Error updating user status:", error);
        throw new Error("Error updating user status");  // Throw a custom error if something goes wrong
    }
};


module.exports = {
    checkUserById,
    updateUserStatusId,
};
