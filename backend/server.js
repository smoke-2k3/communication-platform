const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

const app = express();
app.use(express.json());

// Middleware for session
app.use(session({
    secret: 'your_session_secret', // Change this to a secret string
    resave: false,
    saveUninitialized: false
}));

const authRoutes = require('./routes/auth');
require('./config/passport');

app.use('/auth', authRoutes);

const communicationRoutes = require('./routes/communication');

app.use('/communication', communicationRoutes);

dotenv.config();



// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error(err);
});

// Middleware for session
app.use(session({ secret: process.env.JWT_SECRET, resave: false, saveUninitialized: true }));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/communication', communicationRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});