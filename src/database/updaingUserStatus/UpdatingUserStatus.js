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

const updateUserStatusId = async (userId, status, statusUpdatingDate) => {
    try {
        // Define a mapping of statuses to date fields
        const statusToDateField = {
            'Setup System': 'Setup_System_date',
            'Credentials Received': 'Credential_received_date',
            'BGV Initiated': 'BGV_Initiated_Date',
            'SCOC Training Completed': 'SCOC_Training_Completed_date',
            'ECA Initiated': 'ECA_Submission_Date',
            'BGV Completed': 'BGV_Completion_Date',
            'BGV Submitted': 'BGV_Submission_Date',
            'ECA Shared': 'ECA_Completion_Date',
        };

        // Get the date field for the provided status
        const dateField = statusToDateField[status];
        if (!dateField) {
            throw new Error(`Invalid status: ${status}`);
        }

        // Validate and format the date
        let dateValue = null;
        if (statusUpdatingDate) {
            const parsedDate = new Date(statusUpdatingDate);
            if (isNaN(parsedDate)) {
                throw new Error(`Invalid date format: ${statusUpdatingDate}`);
            }
            dateValue = parsedDate.toISOString().slice(0, 10); // Format date to 'YYYY-MM-DD'
        }

        console.log("Date field being updated:", dateField);
        console.log("Formatted date:", dateValue);

        // Construct the SQL query
        const query = `
            UPDATE listmsaccounttrackings
            SET BGV_Request_status = ?, 
                ${dateField} = ?
            WHERE ID = ?;
        `;
        console.log("Executing query:", query, [status, dateValue, userId]);

        // Execute the query
        const [result] = await db.promise().query(query, [status, dateValue, userId]);
        console.log("Update Result:", result);

        // Return the result
        return result;
    } catch (error) {
        console.error("Error updating user status:", error.message);
        throw new Error("Failed to update user status");
    }
};


module.exports = {
    checkUserById,
    updateUserStatusId,
};
