const express = require('express');
const db = require('../models');
const verifyToken = require('../middleware/verify');

const router = express.Router();
const Todo = db.todo;

// GET to do list for a particular user.
router.get('/', verifyToken, async (req, res) => {
  const userId = req.user.id;

  const todoList = await Todo.findAll({
    where: {
      user_id: userId,
      completed: false,
    },
    attributes: ['id', 'title'],
  });

  res.json(todoList);
});

// POST to do add a todo item for a particular user.
router.post('/', async (req, res) => {
  const userId = req.user.id;
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

// PATCH to do update a todo item.
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find the Todo record by its id
    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    // Update the Todo record with the new data
    await todo.update(updates);

    // Optionally, you can fetch the updated Todo after the update
    const updatedTodo = await Todo.findByPk(id, {
      attributes: ['id', 'title'],
    });

    return res.json({
      message: 'Todo updated successfully',
      todo: updatedTodo,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Error updating Todo' });
  }
});

module.exports = router;
