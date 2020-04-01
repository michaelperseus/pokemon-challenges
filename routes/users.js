const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Game = require('../models/Game');
const Run = require('../models/Runs');
const withAuth = require('../middleware/middleware');

const aws = require('aws-sdk');
const multer = require('multer');

//Configures the AWS connection
aws.config.update({
    secretAccessKey: process.env.AWS_SECRET,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: 'us-east-1'
});

const s3 = new aws.S3();

const upload = require('../services/file-upload');
const singleUpload = upload.single('image');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');


//Saving a featured run
router.post('/saveFeaturedRun', withAuth, async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    user.featuredRun = req.body.runId;
    try {
        await user.save();
        res.send(user);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
})


router.get('/info/:username', async (req, res) => {
    const user = await User.findOne({ username: { $regex: new RegExp("^" + req.params.username + "$", "i") } });
    if (!user) {
        return res.status(404).send({ error: 'User not found' })
    }
    res.status(200).send(user);
})


router.get('/featuredRun/:username', async (req, res) => {
    const user = await User.findOne({ username: { $regex: new RegExp("^" + req.params.username + "$", "i") } });
    if (!user) {
        return res.status(404).send()
    }
    await user.populate('featuredRun', 'game _id variation completed').execPopulate();

    //Returns users most recent run if none is set
    if (!user.featuredRun) {
        const userRun = await Run.findOne({ user: user.username });
        if (!userRun) {
            return res.status(404).send(user.featuredRun)
        }
        const gamepic = await Game.findOne({ gameCode: userRun.game });
        return res.status(200).send({ variation: userRun.variation, _id: userRun._id, game: gamepic.name, logo: gamepic.logo, completed: userRun.completed })
    }
    //Returns set game
    const gamepic = await Game.findOne({ gameCode: user.featuredRun.game });
    return res.status(200).send({ variation: user.featuredRun.variation, _id: user.featuredRun._id, completed: user.featuredRun.completed, game: gamepic.name, logo: gamepic.logo })
}
)

router.get('/verifyFeatRun/:run/:user', async (req, res) => {
    const user = await User.findOne({ username: { $regex: new RegExp("^" + req.params.user + "$", "i") } });
    await user.populate('featuredRun', 'game _id variation completed').execPopulate();
    if (user.featuredRun._id == req.params.run) {
        return res.send({ check: true })
    } else {
        return res.send({ check: false })
    }
})


router.get('/avatar/:username', async (req, res) => {
    const user = await User.findOne({ username: { $regex: new RegExp("^" + req.params.username + "$", "i") } });
    if (!user) {
        return res.status(404).send({ error: 'User not found' })
    }
    res.status(200).send({ avatar: user.avatar });
})

router.get('/badges/:username', async (req, res) => {
    const user = await User.findOne({ username: { $regex: new RegExp("^" + req.params.username + "$", "i") } });
    if (!user) {
        return res.status(404).send({ error: 'User not found' })
    }
    res.status(200).send({ badges: user.badges });
})

//Check is user is an Admin
router.get('/adminCheck', withAuth, async (req, res) => {
    const token = req.header('Authorization').split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.findOne({ username: decoded._id, 'tokens.token': token });
    if (!user.badges.includes('Admin')) {
        return res.status(401).send();
    }
    res.send();
})

//Verify Password is correct
router.post('/passConfirm', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
        res.status(404).send();
    } else {
        res.status(200).send();
    }
})

//Verify if email is active
router.post('/verifyEmail', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        res.status(404).send({ status: 'Email address could not be located' })
    } else {
        res.send({ status: 'Email has been sent!', user })
    }
})

//User Forgot Password
router.post('/forgotPassword', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).send({ response: 'Email address could not be located' });
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
            res.status(500).send({ response: 'An error has occured' })
        } else {
            res.send({ response: 'Your email has been sent!' })
        }
    })
})

//Verify Token is still Valid
router.get('/verifyToken/:token', async (req, res) => {
    const user = await User.findOne({ resetPasswordToken: req.params.token });
    if (!user) {
        return res.status(404).send({ response: 'User not found' });
    }

    if (user.resetPasswordExpires < Date.now()) {
        return res.status(404).send({ response: 'Token has expired' })
    }

    res.send()
})

//Reset Password After Token Confirmation
router.post('/resetPassword', async (req, res) => {
    const user = await User.findOne({ resetPasswordToken: req.body.resetToken });
    if (!user) {
        return res.status(404).send({ response: 'User not found' });
    }

    user.password = req.body.password;

    try {
        await user.save();
        user.resetPasswordExpires = null;
        user.resetPasswordToken = null;
        await user.save();
        res.status(201).send({ response: 'Password has been updated successfully! Please try logging in!' })
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
})

//Update user password while logged in
router.post('/updatePassword', withAuth, async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    const isMatch = await bcrypt.compare(req.body.currentPassword, user.password);
    if (!isMatch) {
        return res.status(404).send();
    }

    user.password = req.body.newPassword;

    try {
        await user.save();
        res.status(201).send({ response: 'Password has been updated successfully!' })
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
        res.status(201).send({ user, token });
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
})


router.post('/newAvatar', withAuth, singleUpload, async (req, res) => {
    const user = await User.findOne({ username: req.body.name });
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
        const user = await User.findOne({ username: req.body.username });
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
        const user = await User.findOne({ username: req.body.username });
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
        res.send({ user, token });
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
})


router.delete('/deleteProfile', withAuth, async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        await user.remove();
        res.send(user);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
})

module.exports = router;