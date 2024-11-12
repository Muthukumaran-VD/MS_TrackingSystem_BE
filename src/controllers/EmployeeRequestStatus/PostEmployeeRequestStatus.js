const { getAllStatusesFromDB } = require("../../database/EmployeeRequestStatus/GetEmployeeRequestStatus");
const { createStatusInDB, generateStatusId } = require("../../database/EmployeeRequestStatus/PostEmployeeRequestStatus");

const createStatus = async (req, res) => {
  const { name, role } = req.body;
  console.log('Received status name:', name, 'and role:', role);  // Log the received data
  
  // Validate if name and role are provided
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Status name is required' });
  }

  if (!role || !role.trim()) {
    return res.status(400).json({ error: 'Role is required' });
  }

  try {
    // Check if the status already exists in the database by name
    const existingStatus = await getAllStatusesFromDB();
    const statusExists = existingStatus.some(status => status.name === name);
    
    if (statusExists) {
      return res.status(400).json({ error: 'Status already exists' });
    }

    // Generate a new status_id
    const status_id = await generateStatusId();

    // Create a new status object
    const newStatus = { status_id, name, role };

    // Insert the new status into the database
    const result = await createStatusInDB(newStatus);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error creating status:', error);
    res.status(500).json({ error: 'Failed to create status' });
  }
};

module.exports = { createStatus };
