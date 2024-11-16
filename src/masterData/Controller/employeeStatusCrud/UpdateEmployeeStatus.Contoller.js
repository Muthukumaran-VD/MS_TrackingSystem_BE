const { getAllStatusesFromDB } = require("../../database/employeeStatusCrud/GetEmployeeStatus.db");
const { updateStatusInDB } = require("../../database/employeeStatusCrud/UpdateEmployeeStatus.db");

// Update an existing status by ID
const updateStatus = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    // Validate if name is provided
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Status name is required' });
    }
  
    try {
      const statusExists = await getAllStatusesFromDB();
      const status = statusExists.find(status => status.status_id === id);
  
      if (!status) {
        return res.status(404).json({ error: 'Status not found' });
      }
  
      // Update status in the database
      const updatedStatus = { ...status, name };
      await updateStatusInDB(id, updatedStatus);
      res.status(200).json(updatedStatus);
    } catch (error) {
      console.error('Error updating status:', error);
      res.status(500).json({ error: 'Failed to update status' });
    }
  };

  module.exports = { updateStatus };