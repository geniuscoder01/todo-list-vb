const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = express();
const userRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');

const JWT_SECRET = 'vitbhopbest'; 
const DB_URL = 'mongodb://localhost:27017/todoapp';

mongoose.connect(DB_URL)
  .then(() => console.log('Connected to mdb'))
  .catch(err => console.log('m err', err));

app.use(express.json());

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token' });
    
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: 'wrong token' });
  }
};

app.use('/auth', userRoutes);
app.use('/todos', checkAuth, todoRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}!`));