const express = require('express');
const Game = require('../models/Game');

const router = express.Router();

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
