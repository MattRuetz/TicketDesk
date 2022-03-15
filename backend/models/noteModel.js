const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Ticket',
    },
    text: {
        type: String,
        required: [true, 'Please add text to note'],
    },
    isStaff: {
        type: Boolean,
        default: false,
    },
    staffId: {
        type: String,
    },
});

const Note = mongoose.model('Note', noteSchema);

module.exports = { Note };
