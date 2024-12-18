const getAllUsersBgvEmployeeFromDB = (searchQuery, page, limit, callback) => {
    const offset = (page - 1) * limit;
    let query = 'SELECT ID,BGV_ID,BGV_Request_status,Legal_Name,Project,Request_Raised_Date,VueData_Email,VueData_Employee_ID FROM listmsaccounttrackings WHERE 1=1';

    if (searchQuery) {
        query += ` AND (Resource_Name LIKE '%${searchQuery}%' OR Client_Partner LIKE '%${searchQuery}%' OR V_Account LIKE '%${searchQuery}%')`;
    }
    query += ' ORDER BY ID DESC';
    query += ` LIMIT ${limit} OFFSET ${offset}`;
    global.db.query(query, (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
};

const getTotalBgvUsersCount = (searchQuery) => {
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

module.exports = { getAllUsersBgvEmployeeFromDB, getTotalBgvUsersCount };
