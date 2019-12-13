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
    },
    logo: {
        type: String,
        required: false
    },
    runs: {
        type: Number,
        required: false,
        default: 0
    }
})

module.exports = mongoose.model('Game', GameSchema);
