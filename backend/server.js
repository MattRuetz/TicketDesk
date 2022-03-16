const path = require('path');
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

// Can create endpoints from other files by adding as middleware with app.use
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));

// Serve frontent
if (process.env.NODE_ENV === 'production') {
    // point express to static (build) folder
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    // load index.html to serve
    app.get('*', (req, res) =>
        res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html')
    );
} else {
    // serve backend API
    app.get('/', (req, res) => {
        res.status(200).json({ message: 'Welcome to the Support Desk API' });
    });
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
