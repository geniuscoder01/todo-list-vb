const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');


router.post('/', async (req, res) => {
  try {
    const todo = new Todo({
      ...req.body,
      userId: req.userId,
    });
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const priority = req.query.priority;
    const skip = (page - 1) * limit;
    
    let query = { userId: req.userId };
    
    if (status) query.status = status;
    if (priority) query.priority = priority;
    
    const todos = await Todo.find(query)
      .sort({ priority: -1, createdAt: -1 }) 
      .skip(skip)
      .limit(limit);
    
    const total = await Todo.countDocuments(query);
    
    res.json({
      todos,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalTodos: total
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, userId: req.userId });
    if (!todo) return res.status(404).json({ error: 'Todo nofound' });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!todo) return res.status(404).json({ error: 'Todonot found' });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;