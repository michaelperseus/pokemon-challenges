const express = require('express');

const withAuth = require('../middleware/middleware');

const router = express.Router();

router.get('/test', withAuth, (req, res) => {
    res.send("You've reached a protected area!");
})

module.exports = router;