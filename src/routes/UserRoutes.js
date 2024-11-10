// routes/UserRoutes.js

const { sendEmailHandler } = require('../controllers/SendMailToUser');
const { getAllUsers } = require('../controllers/GetUsers');
const { updateUser } = require('../controllers/UpdateUser');
const { postUser } = require('../controllers/PostUser');
const { postPasswordUser } = require('../controllers/UserPasswordController');
const { loginUser } = require('../controllers/UserLoginAuthController');


const express = require('express');

const router = express.Router();

router.get('/', getAllUsers);
router.post('/add', postUser);
router.post('/send-email', sendEmailHandler);
router.put('/user/:userId', updateUser);
router.post('/signup', postPasswordUser);
router.post('/login', loginUser);

module.exports = router;
