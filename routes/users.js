const express = require('express');
const router = express.Router();

const User = require('../models/User');
const withAuth = require('../middleware/middleware');

const multer = require('multer');

const upload = require('../services/file-upload');
const singleUpload = upload.single('image');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');


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

//Verify if email is active
router.post('/verifyEmail', async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (!user) {
        res.status(404).send({status: 'Email address could not be located'})
    } else {
        res.send({status: 'Email has been sent!', user})
    }
})

//User Forgot Password
router.post('/forgotPassword', async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (!user) {
        return res.status(404).send({response: 'Email address could not be located'});
    }
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `${process.env.EMAIL_NAME}`,
            pass: `${process.env.EMAIL_PASS}`
        }
    });

    const mailOptions = {
        from: 'PokemonChallenges@gmail.com',
        to: `${req.body.email}`,
        subject: 'Link to Reset Password',
        text: 
            'You are receiving this because you (or some else) have requested to reset the password for your account. \n\n'
            + 'Please click the link below or paste it into your browser within one hour of this email being sent: \n\n'
            + `https://hardy-pokemon-challenge.herokuapp.com/reset/${token}\n\n`
            + 'If you did not request this, please ignore this email and your password will remain unchanged.'
    };

    transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
            console.log(err);
            res.status(500).send({response: 'An error has occured'})
        } else {
            res.send({response: 'Your email has been sent!'})
        }
    })
})

//Verify Token is still Valid
router.get('/verifyToken/:token', async (req, res) => {
    const user = await User.findOne({resetPasswordToken: req.params.token});
    if (!user) {
        return res.status(404).send({response: 'User not found'});
    }

    if (user.resetPasswordExpires < Date.now()) {
        return res.status(404).send({response: 'Token has expired'})
    }

    res.send()
})

//Reset Password After Token Confirmation
router.post('/resetPassword', async (req, res) => {
    const user = await User.findOne({resetPasswordToken: req.body.resetToken});
    if (!user) {
        return res.status(404).send({response: 'User not found'});
    }

    user.password = req.body.password;

    try {
        await user.save();
        user.resetPasswordExpires = null;
        user.resetPasswordToken = null;
        await user.save();
        res.status(201).send({response: 'Password has been updated successfully! Please try logging in!'})
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
})

//Register a new user
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