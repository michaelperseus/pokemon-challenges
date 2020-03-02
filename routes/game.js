const express = require('express');
const Game = require('../models/Game');
const Run = require('../models/Runs');

const router = express.Router();

const multer = require('multer');
const multipart = multer();

const upload = require('../services/file-upload');
const singleUpload = upload.single('image');

//Returns all games
router.get('/all', async (req, res) => {
    const game = await Game.find({}).sort('release');
    if(!game) {
        res.status(404).send('Could not locate any games');
    }
    res.send(game);
})

//Returns a list of games ordered by Most Runs
router.get('/mostPlayedGame', async (req, res) => {
    const runs = await Game.find({}).sort('-runs').limit(1);
    res.send(runs);
})

router.get('/mostRecentGame', async (req, res) => {
    const runs = await Game.find({}).sort('-_id').limit(1);
    res.send(runs)
})

//Return the most completed/failed game
router.get('/mostFinished/:type', async (req, res) => {
    const runs = await Run.find({completed: req.params.type});
    const runGames = runs.map(run => run.game);

    function findMostCommon(arr){
        return arr.sort((a,b) =>
              arr.filter(v => v===a).length
            - arr.filter(v => v===b).length
        ).pop()
    }

    const result = findMostCommon(runGames);
    const game = await Game.find({gameCode: result})

    res.send(game);
})

//Return the requested game
router.get('/:title', async (req, res) => {
    const game = await Game.findOne({gameCode: req.params.title});
    if (!game) {
        return res.send('game not found');
    }
    res.send(game);
})





//Adds a new game to the database
router.post('/newGame', singleUpload, async (req, res) => {
    const game = new Game(req.body);
    game.logo = req.file.location;
    try {
        await game.save();
        res.status(201).send(game)
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
})


router.post('/image', async (req, res) => {
    singleUpload(req, res, function(err) {
        if (err) {
            return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
        }
        console.log(req.file);
        return res.json({'imageUrl': req.file.location});
    })
})


module.exports = router;
