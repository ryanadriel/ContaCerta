const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    occupation: {
        type: String,
        required: false
    },

    user_id: {
        type: String,
        ref: 'User',
        required: true
    }
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;