// routes/UserRoutes.js

const { sendEmailHandler, sendEmailAndUpdateData } = require('../controllers/employee/SendBGVFormToEmployee');
const { getAllUsers } = require('../controllers/employee/GetAllEmployees.Controller');
const { updateUser } = require('../controllers/employee/UpdateEmployeebyId');
const { getAllStatuses } = require('../masterData/Controller/employeeStatusCrud/GetEmployeeStatus.Contoller');
const { createStatus } = require('../masterData/Controller/employeeStatusCrud/PostEmployeeStatus.Contoller');
const { updateStatus } = require('../masterData/Controller/employeeStatusCrud/UpdateEmployeeStatus.Contoller');
const { deleteStatus } = require('../masterData/Controller/employeeStatusCrud/DeleteEmployeeStatus.Controller');
const { postMailId } = require('../masterData/Controller/MaildCrud/PostMaild.Contoller');
const { getAllEmailIds } = require('../masterData/Controller/MaildCrud/GetMailId.Controller');
const { updateUserStatus } = require('../controllers/updatingEmployeeStatus/UpdatingEmployeeStatus');
const express = require('express');
const { getEmployeeDataById } = require('../controllers/employee/GetEmployeeDataById.Controller');
const multer = require('multer');
const { getexportAllUsers } = require('../controllers/exportGetAllEmployees/ExportGetAllEmployee.Controller');
const { getAllBgvEmployees } = require('../controllers/bgvEmployee/GetAllEmployeesData.Controller');


const router = express.Router();

const upload = multer({
    dest: 'uploads/' // Temporary folder for file uploads
});

//BGV employee data
router.get('/getbgvemployee', getAllBgvEmployees)

//export all employee data
router.get('/exportAllemployees', getexportAllUsers)

//All employee data
router.get('/', getAllUsers);
router.post('/send-email', sendEmailHandler);
router.put('/user/:userId', updateUser);

// Route to get all statuses
router.get('/statuses', getAllStatuses);

// Route to create a new status
router.post('/api/entries/', createStatus); 
router.put('/api/entries/:id', updateStatus);
router.delete('/api/entries/:id', deleteStatus);
router.get('/bgv-employeeform/:id', getEmployeeDataById);


router.post('/adding-mail', postMailId);
router.get('/emails', getAllEmailIds);


router.post('/updatinguserstatus', updateUserStatus);
router.put('/update-aadhar-email', upload.single('aadharDocument'), sendEmailAndUpdateData);



module.exports = router;
