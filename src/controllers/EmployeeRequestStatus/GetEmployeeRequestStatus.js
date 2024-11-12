const { getAllStatusesFromDB } = require("../../database/EmployeeRequestStatus/GetEmployeeRequestStatus");

// Get all statuses
const getAllStatuses = async (req, res) => {
    try {
      const statuses = await getAllStatusesFromDB();
      res.status(200).json(statuses);
    } catch (error) {
      console.error('Error fetching statuses:', error);
      res.status(500).json({ error: 'Failed to retrieve statuses' });
    }
  };

  module.exports = { getAllStatuses };

  