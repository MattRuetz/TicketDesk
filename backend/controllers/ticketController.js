// router.route('/').get(protect, getTickets).post(protect, createTicket);

const asyncHandler = require('express-async-handler');

const { User } = require('../models/userModel');
const { Ticket } = require('../models/ticketModel');

// @desc get user tickets
// @route /api/tickets/me
// @access Private
const getTickets = asyncHandler(async (req, res) => {
    // Get user based on _id in webToken
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    // finds ALL tickets created by this user
    const tickets = await Ticket.find({ user: req.user.id });

    res.status(200).json(tickets);
});

// @desc get user ticket
// @route /api/tickets/me
// @access Private
const getTicket = asyncHandler(async (req, res) => {
    // Get user based on _id in webToken
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Finds SINGLE ticket with ID matching one given as URL param ( /:id ) (see ticketRoutes)
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        res.status(404);
        throw new Error('Ticket not found');
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized to access this ticket');
    }

    res.status(200).json(ticket);
});

// @desc create new ticket
// @route POST /api/tickets
// @access Private
const createTicket = asyncHandler(async (req, res) => {
    const { product, description } = req.body;

    if (!product || !description) {
        res.status(400);
        throw new Error('Please add a product and problem description');
    }

    // Get user based on _id in webToken
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: 'new',
    });

    res.status(201).json(ticket);
});

module.exports = { getTickets, getTicket, createTicket };
