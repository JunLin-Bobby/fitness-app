// Routes for authentication (register, login)
const auth = require('../middlewares/auth'); 
const express = require('express');
const router = express.Router();
const { register, login, getMe, logout } = require('../controllers/authController');
const { googleLogin } = require('../controllers/authController'); // 新增

// Register route
router.post('/register', register);
// Login route
router.post('/login', login);
//Logout route
//router.post('/logout',logout);
// Get current user info
router.get('/me', auth,getMe);
router.post('/google', googleLogin); // 新增 Google OAuth 登入 API

module.exports = router;
