const { deleteStatusInDB } = require("../../database/EmployeeRequestStatus/DeleteEmployeeRequestStatus");
const { getAllStatusesFromDB } = require("../../database/EmployeeRequestStatus/GetEmployeeRequestStatus");

// Delete a status by ID
const deleteStatus = async (req, res) => {
    const { id } = req.params;
  
    try {
      const statusExists = await getAllStatusesFromDB();
      const status = statusExists.find(status => status.status_id === id);
  
      if (!status) {
        return res.status(404).json({ error: 'Status not found' });
      }
  
      // Delete status from the database
      await deleteStatusInDB(id);
  
      res.status(200).json({ message: 'Status deleted successfully' });
    } catch (error) {
      console.error('Error deleting status:', error);
      res.status(500).json({ error: 'Failed to delete status' });
    }
  };

  module.exports = { deleteStatus };