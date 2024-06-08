const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const Email = require('../models/Email');
const User = require('../models/User');

const router = express.Router();

// Middleware to authenticate and get user from token
const authenticate = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

router.get('/history', authenticate, async (req, res) => {
    const emails = await Email.find({ user: req.user.id }).sort({ date: -1 });
    res.send(emails);
});

router.post('/send', authenticate, async (req, res) => {
    const { to, subject, body } = req.body;

    const email = new Email({
        user: req.user.id,
        to,
        subject,
        body
    });

    try {
        await email.save();

        // Send email using Postmark
        await axios.post('https://api.postmarkapp.com/email', {
            From: '2021kucp1032@iiitkota.ac.in',
            To: to,
            Subject: subject,
            HtmlBody: body,
        }, {
            headers: {
                'X-Postmark-Server-Token': process.env.POSTMARK_API_TOKEN
            }
        });

        res.send({ success: true });
    } catch (error) {
        res.status(500).send({ error: 'Error sending email.' });
    }
});

module.exports = router;
