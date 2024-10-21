// routes/UserRoutes.js

const { getAllUsers, postUser, sendEmailHandler } = require('../controllers/UserController');
const express = require('express');

const router = express.Router();

router.get('/', getAllUsers);
router.post('/add', postUser);
router.post('/send-email', sendEmailHandler);

module.exports = router;
