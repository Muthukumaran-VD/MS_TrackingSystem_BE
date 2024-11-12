// Function to generate a new ID based on the last ID in the database
async function generateNewId() {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT ID 
             FROM listmsaccounttrackings 
             WHERE ID LIKE 'ID%' 
             ORDER BY CAST(SUBSTRING(ID, 3) AS UNSIGNED) DESC 
             LIMIT 1;
            `,
            (err, results) => {
                if (err) {
                    reject('Error generating ID');
                    return;
                }
                const lastId = results[0] ? results[0].ID : 'ID0000';
                const newIdNumber = parseInt(lastId.replace('ID', ''), 10) + 1;
                const newId = `ID${newIdNumber.toString().padStart(3, '0')}`;
                resolve(newId);
            }
        );
    });
}

// Function to insert email data into the database
async function insertEmailData(email) {
    const newId = await generateNewId();
    return new Promise((resolve, reject) => {
        global.db.query(
            `INSERT INTO listmsaccounttrackings (ID, VueData_Email) VALUES (?, ?)`,
            [newId, email],
            (err, results) => {
                if (err) {
                    reject(`Error inserting data into DB ${err}`);
                    return;
                }
                resolve(newId);
            }
        );
    });
}

module.exports = { insertEmailData };