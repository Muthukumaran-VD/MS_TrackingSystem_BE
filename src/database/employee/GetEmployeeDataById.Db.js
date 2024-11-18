// Service method to fetch employee data by ID
const getEmployeeDatasById = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM listmsaccounttrackings WHERE ID = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                reject('Error fetching employee data');
                return;
            }
            resolve(results[0]); // Assuming there's only one result
        });
    });
};

module.exports = { getEmployeeDatasById };
