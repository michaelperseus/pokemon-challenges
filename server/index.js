const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// require('../config/dev.env').config({ path: '../config/dev.env' });

const userRoutes = require('./routes/users');
const gameRoutes = require('./routes/game');
const runRoutes = require('./routes/runs');
const testRoutes = require('./routes/test');

const withAuth = require('./middleware/middleware');

require('./database/mongoose');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cookieParser());
// app.use(express.json());
app.use('/users', userRoutes);
app.use('/games', gameRoutes);
app.use('/runs', runRoutes);
app.use('/test', testRoutes);

app.get('/checkToken', withAuth, function(req, res) {
    res.sendStatus(200);
})

app.get('*', (req, res) => {
    res.send('Good job');
})

app.listen(port, () => {
    console.log('started on ' + port);
})