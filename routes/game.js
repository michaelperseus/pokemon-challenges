const express = require('express');
const Game = require('../models/Game');
const Run = require('../models/Runs');

const router = express.Router();

const multer = require('multer');
const multipart = multer();

const upload = require('../services/file-upload');
const singleUpload = upload.single('image');

const withAuth = require('../middleware/middleware');

//Returns all games
router.get('/all', async (req, res) => {
    const game = await Game.find({}).sort('release');
    if (!game) {
        res.status(404).send('Could not locate any games');
    }
    res.send(game);
})

//Return game name via gameCode
router.get('/gameName/:name', async (req, res) => {
    const game = await Game.findOne({ gameCode: req.params.name });
    if (!game) {
        return res.status(404).send({ game: 'Could not locate game' })
    }

    res.send({ game: game.name });
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
    const runs = await Run.find({ completed: req.params.type });
    const runGames = runs.map(run => run.game);

    function findMostCommon(arr) {
        return arr.sort((a, b) =>
            arr.filter(v => v === a).length
            - arr.filter(v => v === b).length
        ).pop()
    }

    const result = findMostCommon(runGames);
    const game = await Game.find({ gameCode: result })

    res.send(game);
})

//Returns the Highest Rated Game
router.get('/highestRated', async (req, res) => {
    const game = await Game.find({}).sort('-average').limit(1);
    res.send(game)
})

//Returns a users rating for a game
router.get('/rating/:game/:user', async (req, res) => {
    const game = await Game.findOne({ gameCode: req.params.game });
    if (!game) {
        return res.status(404).send({ error: 'Game not found' })
    }

    const userRating = game.rating.find(rat => {
        return rat.user === req.params.user
    })

    if (!userRating) {
        return res.send({ check: false })
    } else {
        return res.send({ check: true, value: userRating.rating })
    }
})

//Return the requested game
router.get('/:title', async (req, res) => {
    const game = await Game.findOne({ gameCode: req.params.title });
    if (!game) {
        return res.send('game not found');
    }
    res.send(game);
})


//Add a Rating to a game
router.post('/newRating/:game', withAuth, async (req, res) => {
    //Fetch requested game
    const game = await Game.findOne({ gameCode: req.params.game });
    if (!game) {
        console.log(game);
        res.status(404).send()
    }

    const userCheck = game.rating.find(g => g.user === req.body.newRating.user);
    if (userCheck) {
        //If user already has a rating in the system
        if (userCheck.rating === req.body.newRating.rating) {
            return res.status(200).send()
        }
        const updatedRating = game.rating.map(rating => {
            if (rating.user === req.body.newRating.user) {
                rating.rating = req.body.newRating.rating
                return rating
            } else {
                return rating
            }
        })
        try {
            game.rating = updatedRating;
            await game.save();
        } catch (e) {
            console.log(e);
            res.status(500).send(e)
        }
    } else {
        //If user has not entered a rating yet
        try {
            game.rating.push(req.body.newRating);
            await game.save();
        } catch (e) {
            console.log(e);
            res.status(500).send(e)
        }
    }

    //Get new average and update game
    let total = 0
    game.rating.forEach(rat => total += rat.rating);

    let avg = Math.round(total / game.rating.length * 10) / 10;

    try {
        game.average = avg;
        await game.save();
        res.status(200).send();
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
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
    singleUpload(req, res, function (err) {
        if (err) {
            return res.status(422).send({ errors: [{ title: 'Image Upload Error', detail: err.message }] });
        }
        console.log(req.file);
        return res.json({ 'imageUrl': req.file.location });
    })
})


module.exports = router;
