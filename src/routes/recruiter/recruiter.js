const express = require('express');
const router = express.Router();
const recruiterApi = require('../../apis/recruiter/recruiter');

// router.get('/getUsers', usersApi.getAllUsers);

router.post('/jobList', recruiterApi.get_jobs_list);
// router.post('/login', usersApi.login_user);
module.exports = router;
