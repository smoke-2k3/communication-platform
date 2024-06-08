const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.redirect(`/auth/success?token=${token}`);
});

router.get('/success', (req, res) => {
    console.error("got '/success")
    const token = req.query.token;
    res.redirect(`http://localhost:3000/dashboard?token=${token}`);
});

module.exports = router;
