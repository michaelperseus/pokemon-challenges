const express = require('express');
const Run = require('../models/Runs');

const router = express.Router();

router.get('/all', async (req, res) => {
    const runs = await Run.find({});
    res.send(runs);
})

router.get('/:game/all', async (req, res) => {
    const games = await Run.find({game: req.params.game});
    res.send(games);
})

router.get('/:username', async (req, res) => {
    const runs = await Run.find({user: req.params.username});
    res.send(runs);
})

router.post('/newRun', async (req, res) => {
    const run = new Run(req.body);
    try {
        await run.save();
        console.log(run);
        res.status(201).send(run)
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
})


module.exports = router;