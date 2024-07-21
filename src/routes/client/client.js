const express = require('express');
const router = express.Router();
const usersApi = require('../apis/users');

router.get('/getUsers', usersApi.getAllUsers);

router.post('/register', usersApi.register_company);
// router.post('/login', usersApi.login_user);
module.exports = router;
