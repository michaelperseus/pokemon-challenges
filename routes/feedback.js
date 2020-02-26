const express = require('express');
const Feedback = require('../models/Feedback');
const mongoose = require('mongoose');

const withAuth = require('../middleware/middleware');

const router = express.Router();

router.post('/newComment', withAuth, (req, res) => {
    console.log(req.body);
    const fb = new Feedback(req.body);
    try {
        fb.save()
        res.status(201).send({refId: fb._id});
    } catch (e) {
        console.log(e);
        res.status(500).send({response: 'There was an error with your request. Please try again!'});
    }
})


module.exports = router;