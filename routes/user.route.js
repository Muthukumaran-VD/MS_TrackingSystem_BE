const { getAllUsers, postUser } = require('../controllers/user.controller')
const express = require('express');

const router = express.Router();

router.get('/', getAllUsers);


router.post('/add', postUser)

module.exports = router;
