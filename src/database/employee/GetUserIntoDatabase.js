const getAllUsersEmployeeFromDB = (searchQuery, page, limit, callback) => {
    const offset = (page - 1) * limit;
    // Define the columns you want to select
    const columns = [
        'ID', 'BGV_ID', 'Request_ID', 'Position_Type', 'PO_Number', 'Project',
        'MS_Employee_ID', 'V_Account', 'First_Name', 'Last_Name', 'Middle_Name',
        'Resource_Name', 'Legal_Name', 'VueData_Employee_ID', 'VueData_Email',
        'Phone_Number', 'Client_Partner', 'Client_Partner_Email', 'Client_Manager',
        'Client_Manager_Email', 'Client_Lead', 'Client_Lead_Email', 'ECA_Submission_Date',
        'ECA_Completion_Date', 'Expiry_Date', 'Max_Policy_Expiry_Date', 'Work_Start_Date',
        'BGV_Submission_Date', 'BGV_Completion_Date', 'OnSite_Offshore', 'Employment_Type',
        'Primary_Skills', 'Secondary_Skills', 'Resource_Status', 'Billing_Status',
        'Previous_MS_V_Account', 'Client_Lead_Location', 'Client_Manager_Location',
        'Client_Partner_Location', 'Work_End_Date', 'BGV_Request_status', 'Country',
        'Title', 'Sub_Geo', 'manager', 'Request_Raised_Date'
    ].join(', ');

    // Base query with filtering for BGV_Request_status
    let query = `SELECT ${columns} FROM listmsaccounttrackings WHERE BGV_Request_status = 'Setup System'`;
    
    // Append search conditions if provided
    if (searchQuery) {
        query += ` AND (Resource_Name LIKE '%${searchQuery}%' OR Client_Partner LIKE '%${searchQuery}%' OR V_Account LIKE '%${searchQuery}%')`;
    }
    
    // Add sorting and pagination
    query += ' ORDER BY ID DESC';
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



const getTotalUsersCount = (searchQuery) => {
    return new Promise((resolve, reject) => {
        let query = 'SELECT COUNT(*) AS total FROM listmsaccounttrackings WHERE 1=1';
        if (searchQuery) {
            query += ` AND (Resource_Name LIKE '%${searchQuery}%' OR Client_Partner LIKE '%${searchQuery}%' OR V_Account LIKE '%${searchQuery}%')`;
        }
        global.db.query(query, (err, results) => {
            if (err) {
                reject('Error fetching total user count');
                return;
            }
            resolve(results[0].total);
        });
    });
};

module.exports = { getAllUsersEmployeeFromDB, getTotalUsersCount };
