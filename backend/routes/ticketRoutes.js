const express = require('express');
const {
    getTickets,
    getTicket,
    createTicket,
    deleteTicket,
    updateTicket,
} = require('../controllers/ticketController');

// Re-route router into noteRouter
const noteRouter = require('./noteRoutes');
const router = express.Router();
router.use('/:ticketId/notes', noteRouter);

const { protect } = require('../middleware/authMiddleware');

// GET / POST ticket routes, protected (logged in users only)
router.route('/').get(protect, getTickets).post(protect, createTicket);
router
    .route('/:id')
    .get(protect, getTicket)
    .delete(protect, deleteTicket)
    .put(protect, updateTicket);
module.exports = router;
