const express = require('express');
const router = express.Router();

const News = require('../models/News');
const withAuth = require('../middleware/middleware');


router.post('/newPost', async (req, res) => {
    const post = await new News(req.body);
    console.log(post);
    try {
        await post.save();
        res.send(post);
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
})

router.get('/post', async (req, res) => {
    try {
        const post = await News.find().sort('-_id');
        res.send(post)
    } catch (e) {
        res.status(500).send(e)
    }
    
})




module.exports = router;