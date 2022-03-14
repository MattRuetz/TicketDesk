const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

// Connect to database
connectDB();

const app = express();

// Body-parser middleware (dont need npm pkg)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Support Desk API' });
});

// Can create endpoints from other files by adding as middleware with app.use
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
