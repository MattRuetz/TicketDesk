const express = require('express');
const { getTickets, createTicket } = require('../controllers/ticketController');

const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

// GET / POST ticket routes, protected (logged in users only)
router.route('/').get(protect, getTickets).post(protect, createTicket);

module.exports = router;
