const express = require('express');
const {
    getTickets,
    getTicket,
    createTicket,
} = require('../controllers/ticketController');

const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

// GET / POST ticket routes, protected (logged in users only)
router.route('/').get(protect, getTickets).post(protect, createTicket);
router.route('/:id').get(protect, getTicket);
module.exports = router;
