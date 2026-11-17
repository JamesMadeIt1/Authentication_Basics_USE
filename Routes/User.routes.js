const express = require('express');
const { registerUser, logInUser } = require('../Controllers/User.controller');
const router = express.Router();

// API Routes

// Sign-up route
router.post('/signup', registerUser);

// LogIn route
router.post('/login', logInUser);

module.exports = router;