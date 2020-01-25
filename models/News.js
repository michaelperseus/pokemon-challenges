const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    title: {
        type: String
    },
    date: {
        type: String
    },
    body: {
        type: String
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('News', NewsSchema);