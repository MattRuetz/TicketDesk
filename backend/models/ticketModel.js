const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Ticket',
    },
    product: {
        type: String,
        required: [true, 'Please select a product'],
        emun: ['iPhone', 'Macbook Pro', 'iMac', 'iPad'], //
    },
    description: {
        type: String,
        required: [true, 'Please describe your issue'],
    },
    status: {
        type: String,
        required: true,
        enum: ['new', 'open', 'closed'],
        default: false,
    },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = { Ticket };
