const mongoose = require('mongoose');

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
    pokemon: [{
        pokemon: {
            type: String
        },
        nickname: {
            type: String
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
