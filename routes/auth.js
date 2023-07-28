const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

const db = require('../models');
const config = require('../config/auth');

const User = db.user;

// Signup route
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  // Check if the username is already taken
  const user = await User.findOne({
    where: {
      username,
    },
  });

  if (user) {
    return res.status(401).json({ message: 'That username is already taken, please try a different one.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  User.create({
    username,
    password: hashedPassword,
  });

  res.status(201).json({ message: 'User signed up successfully!' });

  return null;
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    where: {
      username,
    },
  });

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, config.secret, {
    expiresIn: config.expiration,
  });
  res.json({ token });

  return null;
});

module.exports = router;
