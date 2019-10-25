const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    generation: {
        type: Number,
        required: true
    },
    hack: {
        type: Boolean,
        required: true
    },
    gameCode: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Game', GameSchema);
