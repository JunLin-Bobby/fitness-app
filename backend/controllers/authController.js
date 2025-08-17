// Authentication controller: register and login

const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Register new user
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({ name: username, email, passwordHash });
    await user.save();

    // Generate JWT
    const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Check password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT
    const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Google login
exports.googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    // 驗證 Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name } = payload;

    // 檢查是否已有用戶
    let user = await User.findOne({ email });
    if (!user) {
      // 新增用戶（Google 用戶不需密碼）
      user = new User({ name, email, passwordHash: 'google-oauth' });
      await user.save();
    }

    // 產生 JWT
    const jwtToken = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token: jwtToken, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(401).json({ message: 'Google login failed' });
  }
};

//Get current user info
exports.getMe = (req, res) => {
  console.log('req.user in getMe:', req.user); // 檢查有沒有資料
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  res.json({ username: req.user.name, id: req.user.id });
};