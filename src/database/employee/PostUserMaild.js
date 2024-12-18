async function generateNewId() {
    try {
        return await new Promise((resolve, reject) => {
            db.query(
                `SELECT ID 
                 FROM listmsaccounttrackings 
                 WHERE ID LIKE 'ID%' 
                 ORDER BY CAST(SUBSTRING(ID, 3) AS UNSIGNED) DESC 
                 LIMIT 1;`,
                (err, results) => {
                    if (err) {
                        console.error('Error generating ID:', err);
                        return reject(new Error('Error generating ID'));
                    }
                    const lastId = results[0] ? results[0].ID : 'ID0000';
                    const newIdNumber = parseInt(lastId.replace('ID', ''), 10) + 1;
                    const newId = `ID${newIdNumber.toString().padStart(3, '0')}`;
                    resolve(newId);
                }
            );
        });
    } catch (error) {
        console.error('Unhandled error in generateNewId:', error);
        throw new Error('Failed to generate a new ID');
    }
}

async function insertEmailData(formData) {
    try {
        const newId = await generateNewId();

        return await new Promise((resolve, reject) => {
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
                bgvRequestStatus,
            ];

            db.query(query, values, (err, results) => {
                if (err) {
                    console.error('Error inserting data into DB:', err);
                    return reject(new Error(`Error inserting data into DB: ${err.message}`));
                }
                resolve(newId);
            });
        });
    } catch (error) {
        console.error('Unhandled error in insertEmailData:', error);
        throw new Error('Failed to insert email data');
    }
}

const updateEmployeeData = async (data) => {
    const bgvRequestStatus = 'Personal Details Shared';
    const query = `
        UPDATE listmsaccounttrackings
        SET 
            First_Name = ?, 
            Middle_Name = ?, 
            Last_Name = ?, 
            Legal_Name = ?, 
            Title = ?, 
            Manager = ?, 
            Phone_Number = ?, 
            VueData_Email = ?, 
            Country = ?, 
            Request_Raised_Date = ?, 
            Work_End_Date = ?, 
            Project = ?, 
            Sub_Geo = ?,
            BGV_Request_status = ?
        WHERE ID = ?
    `;

    const values = [
        data.firstName || null,
        data.middleName || null,
        data.lastName || null,
        data.legalName || null,
        data.title || null,
        data.manager || null,
        data.personalCell || null,
        data.personalEmail || null,
        data.country || null,
        data.startDate || null,
        data.endDate || null,
        data.team || null,
        data.subGeo || null,
        bgvRequestStatus, // Place BGV_Request_status here
        data.id || null,  // Place ID at the correct position for the WHERE clause
    ];

    try {
        return await new Promise((resolve, reject) => {
            db.query(query, values, (err, results) => {
                if (err) {
                    console.error('Error updating employee data:', err);
                    return reject(new Error(`Database error: ${err.message}`));
                }
                resolve({ success: results.affectedRows > 0 });
            });
        });
    } catch (error) {
        console.error('Unhandled error in updateEmployeeData:', error);
        throw new Error('Failed to update employee data');
    }
};


module.exports = { insertEmailData, updateEmployeeData };
