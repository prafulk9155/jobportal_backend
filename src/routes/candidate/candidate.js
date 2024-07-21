const express = require('express');
const router = express.Router();
const candidateApi = require('../../apis/candidate/candidate');

// router.get('/getUsers', usersApi.getAllUsers);

router.post('/addDetails', candidateApi.add_details);
// router.post('/login', usersApi.login_user);
module.exports = router;
