const express = require('express');
const router = express.Router();
const { login, logout, register } = require('../controller/userController');

// register route
 router.post('/register',register)

// Login route
router.post('/login', login);

// Logout route
router.get('/logout', logout);

module.exports = router;
