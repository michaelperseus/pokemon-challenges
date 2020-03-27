const mongoose = require('mongoose');
const validator = require('validator');

const GameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    generation: {
        type: String,
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
    },
    release: {
        type: Number,
        required: true
    },
    rating: [{
        user: {
            type: String
        },
        rating: {
            type: Number
        }
    }],
    average: {
        type: Number
    }
})

module.exports = mongoose.model('Game', GameSchema);
