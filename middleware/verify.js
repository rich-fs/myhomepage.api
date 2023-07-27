const jwt = require('jsonwebtoken');
const config = require("../config/auth.js")

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
 
  jwt.verify(token.split(' ')[1], config.secret, (err, decoded) => {

    if (err) {
      return res.status(401).json({ message: err });
    }

    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;