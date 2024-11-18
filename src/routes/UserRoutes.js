// routes/UserRoutes.js

const { sendEmailHandler } = require('../controllers/employee/SendBGVFormToEmployee');
const { getAllUsers } = require('../controllers/employee/GetAllEmployees.Controller');
const { updateUser } = require('../controllers/employee/UpdateEmployeebyId');
const { postPasswordUser } = require('../controllers/UserPasswordController');
const { loginUser } = require('../controllers/UserLoginAuthController');
const { getAllStatuses } = require('../masterData/Controller/employeeStatusCrud/GetEmployeeStatus.Contoller');
const { createStatus } = require('../masterData/Controller/employeeStatusCrud/PostEmployeeStatus.Contoller');
const { updateStatus } = require('../masterData/Controller/employeeStatusCrud/UpdateEmployeeStatus.Contoller');
const { deleteStatus } = require('../masterData/Controller/employeeStatusCrud/DeleteEmployeeStatus.Controller');
const { postMailId } = require('../masterData/Controller/MaildCrud/PostMaild.Contoller');
const { getAllEmailIds } = require('../masterData/Controller/MaildCrud/GetMailId.Controller');
const { updateUserStatus } = require('../controllers/updatingEmployeeStatus/UpdatingEmployeeStatus');
const express = require('express');
const { getEmployeeDataById } = require('../controllers/employee/GetEmployeeDataById.Controller');

const router = express.Router();




router.get('/', getAllUsers);
router.post('/send-email', sendEmailHandler);
router.put('/user/:userId', updateUser);
router.post('/signup', postPasswordUser);
router.post('/login', loginUser);
// Route to get all statuses
router.get('/statuses', getAllStatuses);
// Route to create a new status
router.post('/api/entries/', createStatus);
// Route to update a specific status by ID
router.put('/api/entries/:id', updateStatus);
// Route to delete a specific status by ID
router.delete('/api/entries/:id', deleteStatus);
router.get('/bgv-employeeform/:id', getEmployeeDataById);
router.post('/adding-mail', postMailId);

router.get('/emails', getAllEmailIds);
router.post('/updatinguserstatus', updateUserStatus);


module.exports = router;
