const express = require('express');
const router = express.Router();
const { postSignup, postSignin, guestLogin } = require('../controllers/authController');

// Sign-Up route
router.post('/signup', postSignup);

// Sign-In route
router.post('/signin', postSignin);

// Guest Login route
router.post('/login', guestLogin);

module.exports = router;
