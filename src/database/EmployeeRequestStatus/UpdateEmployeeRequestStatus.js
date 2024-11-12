// Update an existing status by ID
const updateStatusInDB = async (id, status) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE employee_request_status SET name = ? WHERE status_id = ?';
      db.query(query, [status.name, id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };

  module.exports = { updateStatusInDB };