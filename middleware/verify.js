const jwt = require('jsonwebtoken');
const config = require('../config/auth');

const verifyToken = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], config.secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: err });
  }

  return null;
};

module.exports = verifyToken;
