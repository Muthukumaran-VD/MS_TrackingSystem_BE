// routes/UserRoutes.js

const { getAllUsers, postUser, sendEmailHandler, updateUser } = require('../controllers/UserController');
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
