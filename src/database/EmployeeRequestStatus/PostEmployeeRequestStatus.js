// Generate a new status ID based on the last inserted ID
const generateStatusId = async () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT status_id FROM employee_request_status ORDER BY status_id DESC LIMIT 1`;
    global.db.query(query, (err, results) => {
      if (err) {
        return reject('Error retrieving last status_id: ' + err);
      }

      if (results.length === 0) {
        return resolve('ST001');
      }

      const lastStatusId = results[0].status_id;
      const lastNumber = parseInt(lastStatusId.replace('ST', '')) || 0;
      const newNumber = lastNumber + 1;
      const newStatusId = `ST${newNumber.toString().padStart(3, '0')}`;
      resolve(newStatusId);
    });
  });
};


const createStatusInDB = async ({ status_id, name, role }) => {
  return new Promise((resolve, reject) => {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS employee_request_status (
        status_id VARCHAR(10) PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        role VARCHAR(255) NOT NULL
      );
    `;

    global.db.query(createTableQuery, (err) => {
      if (err) {
        return reject('Error creating table: ' + err);
      }

      const insertQuery = 'INSERT INTO employee_request_status (status_id, name, role) VALUES (?, ?, ?)';
      global.db.query(insertQuery, [status_id, name, role], (err, results) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            reject('Status name already exists');
          } else {
            reject('Error inserting status: ' + err);
          }
        } else {
          resolve({ status_id, name, role });
        }
      });
    });
  });
};


module.exports = { createStatusInDB, generateStatusId };
