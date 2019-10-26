const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const gameRoutes = require('./routes/game');

require('./database/mongoose');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
// app.use(express.json());
app.use('/users', userRoutes);
app.use('/games', gameRoutes);

app.get('*', (req, res) => {
    res.send('Good job');
})

app.listen(port, () => {
    console.log('started on ' + port);
})