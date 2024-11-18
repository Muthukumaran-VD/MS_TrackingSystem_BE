// Function to generate a new ID based on the last ID in the database
async function generateNewId() {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT ID 
             FROM listmsaccounttrackings 
             WHERE ID LIKE 'ID%' 
             ORDER BY CAST(SUBSTRING(ID, 3) AS UNSIGNED) DESC 
             LIMIT 1;`,
            (err, results) => {
                if (err) {
                    console.error('Error generating ID:', err);
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

// Function to insert form data into the database

// Function to insert form data into the database
async function insertEmailData(formData) {
    const newId = await generateNewId();

    return new Promise((resolve, reject) => {
        // Use the formData.BGV_Request_status value, or default to 'Requested Personal Details'
        const bgvRequestStatus = formData.BGV_Request_status || 'Requested Personal Details';

        const query = `
            INSERT INTO listmsaccounttrackings (
                ID, First_Name, Middle_Name, Last_Name, Legal_Name, Title, Manager, 
                Phone_Number, VueData_Email, Country, Request_Raised_Date, Work_End_Date, 
                Project, Sub_Geo, BGV_Request_status
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            newId,
            formData.firstName || null,
            formData.middleName || null,
            formData.lastName || null,
            formData.legalName || null,
            formData.title || null,
            formData.manager || null,
            formData.personalCell || null,
            formData.personalEmail || null,
            formData.country || null,
            formData.startDate || null,
            formData.endDate || null,
            formData.teamProject || null,
            formData.subGeo || null,
            bgvRequestStatus // Include the dynamic or default BGV_Request_status here
        ];

        db.query(query, values, (err, results) => {
            if (err) {
                console.error('Error inserting data into DB:', err);
                reject(`Error inserting data into DB: ${err}`);
                return;
            }
            resolve(newId);
        });
    });
}

module.exports = { insertEmailData };


module.exports = { insertEmailData };
