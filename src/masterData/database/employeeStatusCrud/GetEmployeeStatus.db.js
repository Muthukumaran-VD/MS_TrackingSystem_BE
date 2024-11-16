
// Fetch all statuses from the database
const getAllStatusesFromDB = async () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM employee_request_status ORDER BY status_id', (err, results) => {
        if (err) {
          console.error("Error fetching statuses:", err);  // Log the error for debugging
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };
  
  module.exports = { getAllStatusesFromDB };
  