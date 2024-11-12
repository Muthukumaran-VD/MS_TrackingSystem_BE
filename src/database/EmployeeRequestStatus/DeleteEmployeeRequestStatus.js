// Delete a status by ID
const deleteStatusInDB = async (id) => {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM employee_request_status WHERE status_id = ?';
      db.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };

  module.exports = { deleteStatusInDB };