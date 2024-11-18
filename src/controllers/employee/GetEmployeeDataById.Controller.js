const { getEmployeeDatasById } = require("../../database/employee/GetEmployeeDataById.Db");


// Controller method to get employee data by ID
const getEmployeeDataById = async (req, res) => {
    const { id } = req.params;

    try {
        const employeeData = await getEmployeeDatasById(id);
        if (!employeeData) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json(employeeData); // Send employee data as a JSON response
    } catch (err) {
        console.error('Error in controller:', err);
        res.status(500).json({ error: 'Error fetching employee data' });
    }
};  

module.exports = { getEmployeeDataById };
