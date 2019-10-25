const express = require('express');
const userRoutes = require('./routes/users');

const app = express();
const port = process.env.PORT || 5000;

app.use('/users', userRoutes);

app.get('*', (req, res) => {
    res.send('Good job');
})

app.listen(port, () => {
    console.log('started on ' + port);
})