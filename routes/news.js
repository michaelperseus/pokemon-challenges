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
        const post = await News.findById('5e26739a607f1732f5da1e16');
        res.send(post)
    } catch (e) {
        res.status(500).send(e)
    }
    
})




module.exports = router;