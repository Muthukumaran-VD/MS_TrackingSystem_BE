// routes/UserRoutes.js

const { sendEmailHandler } = require('../controllers/employee/SendMailToUser');
const { getAllUsers } = require('../controllers/employee/GetUsers');
const { updateUser } = require('../controllers/employee/UpdateUser');
const { postPasswordUser } = require('../controllers/UserPasswordController');
const { loginUser } = require('../controllers/UserLoginAuthController');
const { getAllStatuses } = require('../controllers/EmployeeRequestStatus/GetEmployeeRequestStatus');
const { createStatus } = require('../controllers/EmployeeRequestStatus/PostEmployeeRequestStatus');
const { updateStatus } = require('../controllers/EmployeeRequestStatus/UpdateEmployeeRequestStatus');
const { deleteStatus } = require('../controllers/EmployeeRequestStatus/DeleteEmployeeRequestStatus');
const { postMailId } = require('../controllers/email_crud/PostMail');
const { getAllEmailIds } = require('../controllers/email_crud/GetMail');
const { updateUserStatus } = require('../controllers/updatingUserStatus/UpdatingUserStatus');
const express = require('express');
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

router.post('/adding-mail', postMailId);

router.get('/emails', getAllEmailIds);
router.post('/updatinguserstatus', updateUserStatus);


module.exports = router;
