const express = require('express');
const Run = require('../models/Runs');
const Game = require('../models/Game');

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


router.delete('/delete', async (req, res) => {
    const run = await Run.findByIdAndDelete(req.body.id);
        if (!run) {
            res.status(500).send();
        } else {
            const game = await Game.findOne({gameCode: run.game});
            game.runs--;
            await game.save();
            res.status(200).send(run); 
        } 
})

router.post('/newRun', async (req, res) => {
    const run = new Run(req.body);
    try {
        await run.save();
        const game = await Game.findOne({gameCode: req.body.game});
        game.runs++;
        await game.save();
        res.status(201).send(run);
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
})



module.exports = router;