const express = require('express');
const router = express.Router();

const User = require('../models/User');
const withAuth = require('../middleware/middleware');

const jwt = require('jsonwebtoken');

router.get('/me', (req, res) => {
    res.send('connection established!')
})

router.get('/userInfo/:username', /*withAuth,*/ async (req, res) => {
    const user = await User.find({username: req.params.username});
    if (!user) {
        return res.status(404).send({error: 'User not found'})
    } 
    res.status(200).send(user);
})

router.post('/register', (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
        if (err) {
            res.status(500).send('Error registering new User', err)
        } else {
            res.status(201).send('Welcome to the site!')
        }
    })
})

router.post('/authenticate', (req, res) => {
    User.findOne({username: req.body.username}, (err, user) => {
        if (err) {
            console.error(err);
            res.status(500).json({error: 'error'});
        } else if (!user) {
            res.status(401).json({error: 'User not found'});
        } else {
            user.isCorrectPassword(req.body.password, (err, same) => {
                if (err) {
                    res.status(500).json({error: 'password'})
                } else if (!same) {
                    res.status(401).json({error: 'Incorrect email or password'})
                } else {
                    const payload = req.body.username;
                    const token = jwt.sign(payload, process.env.SECRET, {
                        // expiresIn: '500m'
                    });
                    res.cookie('token', token, {httpOnly: true}).status(200).send(user);
                }
            })
        }
    })
})

module.exports = router;