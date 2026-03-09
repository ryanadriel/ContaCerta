const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag; 