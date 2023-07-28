const express = require('express');
const db = require('../models');
const verifyToken = require('../middleware/verify');

const router = express.Router();
const Todo = db.todo;

/* GET to do list for a particular user. */
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

/* POST to do add a todo item for a particular user. */
router.post('/', async (req, res) => {
  const userId = 1;
  const { title } = req.body;

  if (!title) {
    return res.status(422).json({ message: 'Error creating Todo item, please provide a title.' });
  }

  try {
    await Todo.create({
      user_id: userId,
      title,
    });
  } catch (err) {
    return res.status(422).json({ message: 'Error creating Todo item, please try again.' });
  }

  return res.status(201).json({ message: 'Todo item successfully created!' });
});

module.exports = router;
