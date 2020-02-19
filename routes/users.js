const express = require('express');
const router = express.Router();

const User = require('../models/User');
const withAuth = require('../middleware/middleware');

const multer = require('multer');

const upload = require('../services/file-upload');
const singleUpload = upload.single('image');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


router.get('/info/:username', async (req, res) => {
    const user = await User.findOne({username: {$regex: new RegExp("^" + req.params.username + "$", "i")}});
    if (!user) {
        return res.status(404).send({error: 'User not found'})
    } 
    res.status(200).send(user);
})

router.get('/avatar/:username', async (req, res) => {
    const user = await User.findOne({username: {$regex: new RegExp("^" + req.params.username + "$", "i")}});
    if (!user) {
        return res.status(404).send({error: 'User not found'})
    } 
    res.status(200).send({avatar: user.avatar});
})

//Verify Password is correct
router.post('/passConfirm', async (req, res) => {
    console.log(req.body);
    const user = await User.findOne({username: req.body.username});
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
        res.status(404).send();
    } else {
        res.status(200).send();
    }
})

router.post('/register', async (req, res) => {
    const user = await new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthTokens();
        res.status(201).send({user, token});
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
})


router.post('/newAvatar', withAuth, singleUpload, async (req, res) => {
    const user = await User.findOne({username: req.body.name});
    user.avatar = req.file.location;
    try {
        await user.save();
        res.send(user);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
})

router.post('/logout', withAuth, async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        console.log(req.body.token);
        user.tokens = await user.tokens.filter((token) => {
            return token.token !== req.body.token;
        })
        await user.save();
        res.send(user)

    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
})

router.post('/logoutAll', withAuth, async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        user.tokens = [];
        await user.save();
        res.send(user);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
    
})

router.post('/authenticate', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password);
        const token = await user.generateAuthTokens();
        res.send({user, token});
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
})


router.delete('/deleteProfile', withAuth, async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        await user.remove();
        res.send(user);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
})

module.exports = router;