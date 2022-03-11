const webToken = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { User } = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        // Found a token
        try {
            // get token from header
            token = req.headers.authorization.split(' ')[1];
            // verify token
            const decoded = webToken.verify(token, process.env.JWT_SECRET);
            // get user info from token
            req.user = await User.findById(decoded.id).select('-password');

            next(); // go to next piece of middleware
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not Authorized');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not Authorized');
    }
});

module.exports = { protect };
