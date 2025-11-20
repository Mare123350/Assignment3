// routes/tasks.js
// Handles all CRUD operations for Task documents

const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Simple auth gate (if you want create/edit/delete protected)
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  // If you're not using auth yet, just call next() instead:
  // return next();
  req.flash('error_msg', 'Please log in to manage tasks');
  res.redirect('/auth/login');
}

// GET /tasks - list all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });

    res.render('tasks/list', {
      title: 'My Tasks',
      tasks,
    });
  } catch (err) {
    console.error(err);
    res.render('error', {
      title: 'Error',
      message: 'Failed to load tasks',
    });
  }
});

// GET /tasks/create - show Create form
router.get('/create', ensureAuthenticated, (req, res) => {
  res.render('tasks/form', {
    title: 'Create Task',
    formAction: '/tasks/create',   // 👈 used in form.ejs
    submitLabel: 'Create',         // 👈 used in form.ejs
    task: {},                      // empty task object
  });
});

// POST /tasks/create - handle Create form
router.post('/create', ensureAuthenticated, async (req, res) => {
  try {
    // checkbox: completed → convert "on" to true/false
    const data = {
      ...req.body,
      completed: req.body.completed === 'on',
    };

    await Task.create(data);
    req.flash('success_msg', 'Task created successfully!');
    res.redirect('/tasks');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Failed to create task');
    res.redirect('/tasks/create');
  }
});

// GET /tasks/edit/:id - show Edit form
router.get('/edit/:id', ensureAuthenticated, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      req.flash('error_msg', 'Task not found');
      return res.redirect('/tasks');
    }

    res.render('tasks/form', {
      title: 'Edit Task',
      formAction: `/tasks/edit/${req.params.id}`, // 👈 used in form.ejs
      submitLabel: 'Update',                      // 👈 used in form.ejs
      task,
    });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error loading task');
    res.redirect('/tasks');
  }
});

// POST /tasks/edit/:id - handle Edit form
router.post('/edit/:id', ensureAuthenticated, async (req, res) => {
  try {
    const data = {
      ...req.body,
      completed: req.body.completed === 'on',
    };

    await Task.findByIdAndUpdate(req.params.id, data);
    req.flash('success_msg', 'Task updated successfully');
    res.redirect('/tasks');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Failed to update task');
    res.redirect('/tasks');
  }
});

// POST /tasks/delete/:id - delete task
router.post('/delete/:id', ensureAuthenticated, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Task deleted');
    res.redirect('/tasks');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Failed to delete task');
    res.redirect('/tasks');
  }
});

module.exports = router;
