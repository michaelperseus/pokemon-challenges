const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Feedback', FeedbackSchema);
