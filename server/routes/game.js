const express = require('express');
const Game = require('../models/Game');

const router = express.Router();

//Return the requested game
router.get('/:title', async (req, res) => {
    const game = await Game.findOne({gameCode: req.params.title});
    if (!game) {
        return res.send('game not found');
    }
    res.send(game);
})


//Adds a new game to the database
router.post('/newGame', async (req, res) => {
    const game = new Game(req.body);
    try {
        await game.save();
        res.status(201).send(game)
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
})

module.exports = router;
