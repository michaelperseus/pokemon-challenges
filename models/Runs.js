const mongoose = require('mongoose');
const validator = require('validator');

const RunSchema = new mongoose.Schema({
    game: {
        type: String,
        required: true
    },
    completed: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    variation: {
        type: String,
        default: 'nuzlocke'
    },
    randomized: {
        type: String,
        required: true
    },
    pokemon: [{
        pokemon: {
            type: String
        },
        nickname: {
            type: String,
            validate(value) {
                if (!validator.isLength(value, {min: 1, max: 12})) {
                    throw new Error('Nickname is invalid length');
                }
            }
        },
        starter: {
            type: Boolean,
            default: false
        },
        status: {
            type: String,
            defaukt: 'alive'
        }
    }],
    runNotes: {
        type: String,
        default: ''
    },
    comments: [{
        user: {
            type: String
        },
        message: {
            type: String
        },
        posted: {
            type: Date
        }
    }]
},
{
    timestamps: true
})

module.exports = mongoose.model('Run', RunSchema);
