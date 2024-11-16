const getAllEmails = async () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM emails', (err, results) => {
        if (err) {
          console.error("Error fetching mailid:", err);  // Log the error for debugging
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };

module.exports = { getAllEmails };
