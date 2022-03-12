const express = require('express');
const {
    registerUser,
    loginUser,
    getMe,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Router endpoints ......
router.post('/', registerUser);
router.post('/login', loginUser);
// protect arg makes it private route
router.get('/me', protect, getMe);

// router is the object with express endpoints attached
module.exports = router;
