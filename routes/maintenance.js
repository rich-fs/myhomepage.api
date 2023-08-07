const express = require('express');
const pino = require('pino');
const db = require('../models');

const router = express.Router();

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});

// GET home page.
router.get('/dbcreate', (req, res) => {
  db.sequelize.sync({ force: true }).then(() => {
    logger.info('Drop and Resync Db');
  });
  res.json({ message: 'db created' });
});

module.exports = router;
