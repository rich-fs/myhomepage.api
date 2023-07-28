const express = require('express');
const db = require('../models');
const verifyToken = require('../middleware/verify');

const router = express.Router();
const Todo = db.todo;

/* GET to do llist for a particular user. */
router.get('/', verifyToken, async (req, res) => {
  const userId = req.user.id;

  const todoList = await Todo.findAll({
    where: {
      user_id: userId,
    },
  });

  res.json({
    message: 'Welcome to todo list',
    todoList,
  });
});

module.exports = router;
