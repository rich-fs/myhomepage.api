const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verify.js');

/* GET to do listing. */
router.get('/', verifyToken, function(req, res, next) {
  res.json({ message: "Welcome to todo list" });
});

module.exports = router;
