const express = require('express');
const app = express();
const port = 3000; // You can change the port if needed

// Middleware to parse JSON in request body
app.use(express.json());

app.use(express.static('public'));

// Sample data to store tasks
let tasks = [];

// Root route
app.get('/', (req, res) => {
    //res.send('Welcome to the Task API');
    res.sendFile('public/index.html');
  });

// GET all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// GET a specific task by ID
app.get('/tasks/:taskId', (req, res) => {
  const taskId = req.params.taskId;
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    res.status(404).json({ error: 'Task not found' });
  } else {
    res.json(task);
  }
});

// POST a new task
app.post('/tasks', (req, res) => {
  const task = req.body;
  tasks.push(task);
  res.status(201).json(task);
});

// PUT (update) a task by ID
app.put('/tasks/:taskId', (req, res) => {
  const taskId = req.params.taskId;
  const updatedTask = req.body;
  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex === -1) {
    res.status(404).json({ error: 'Task not found' });
  } else {
    tasks[taskIndex] = updatedTask;
    res.json(updatedTask);
  }
});

// DELETE a task by ID
app.delete('/tasks/:taskId', (req, res) => {
  const taskId = req.params.taskId;
  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex === -1) {
    res.status(404).json({ error: 'Task not found' });
  } else {
    tasks.splice(taskIndex, 1);
    res.status(204).end(); // 204 No Content
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port 3000`);
});
