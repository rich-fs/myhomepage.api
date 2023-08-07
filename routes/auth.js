const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const config = require('../config/auth');

const router = express.Router();

const User = db.user;

// POST Signup route
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  // Check if the email is already taken
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (user) {
    return res.status(401).json({ message: 'That email is already taken, please try a different one.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  User.create({
    email,
    password: hashedPassword,
  });

  return res.status(201).json({ message: 'User signed up successfully!' });
});

// POST Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, config.secret, {
    expiresIn: config.expiration,
  });

  return res.json({ token });
});

module.exports = router;
