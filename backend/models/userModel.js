const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true, //email must not already be in users DB
    },
    password: {
        type: String,
        required: [true, 'Please set a password'],
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
