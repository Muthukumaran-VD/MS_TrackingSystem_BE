

// Function to insert email data into the database
const saveEmail = async (mailTo, ccMail) => {
    const query = 'INSERT INTO emails (mailTo, ccMail) VALUES (?, ?)';
    
    try {
        // Use the promise version of db.query
        const [result] = await db.promise().query(query, [mailTo, ccMail]);
        return result.insertId; // Return the inserted row ID (auto-incremented)
    } catch (error) {
        // Log the error for debugging
        console.error('Error executing query:', error);
        throw new Error('Database query failed');
    }
};

module.exports = { saveEmail };
