const express = require('express');

const app = express();

app.get('/me', (req, res) => {
    res.send('connection established!')
})


module.exports = app;