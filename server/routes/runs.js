const express = require('express');
const Run = require('../models/Runs');
const Game = require('../models/Game');
const mongoose = require('mongoose');

const router = express.Router();


//Fetching Routes
router.get('/all', async (req, res) => {
    const runs = await Run.find({});
    res.send(runs);
})

router.get('/view/:id', async (req, res) => {
    try {
        const run = await Run.findById(req.params.id);
        res.status(200).send(run)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/:game/all', async (req, res) => {
    const games = await Run.find({game: req.params.game});
    res.send(games);
})


router.get('/:username', async (req, res) => {
    const runs = await Run.find({user: req.params.username});
    res.send(runs);
})



// Adding Routes
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

//Deleting Routes
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

//Updating Routes
router.patch('/updateRun', async (req, res) => {
    console.log(req.body);
    const allowedUpdates = ['completed', 'pokemon', 'variation', '_id'];
    const run = await Run.findOne({_id: req.body._id});
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send('unable to process update')
    }

    try {
        updates.forEach((update) => {
            if (update == 'pokemon') {
                console.log(req.body[update]);
                req.body[update].forEach(pkmn => run.pokemon.push({pokemon: pkmn}))
            } else {
                run[update] = req.body[update]
            }
            
        });
        await run.save();
        console.log(run);
        res.status(200).send(run)
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
})



module.exports = router;