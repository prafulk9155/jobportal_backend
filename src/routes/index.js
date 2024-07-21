const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to the Express-MySQL backend system!');
});

module.exports = router;
