const getExportAllEmployeeFromDB = (callback) => {
    // Query to fetch all employees
    const query = `
        SELECT *
        FROM 
            listmsaccounttrackings
        ORDER BY ID DESC`; // Sorted by ID

    // Execute the query
    global.db.query(query, (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
};

module.exports = { getExportAllEmployeeFromDB };
