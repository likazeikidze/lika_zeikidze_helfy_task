const express = require("express");
const router = express.Router();
const validateTask = require("../middleware/validateTask");

let tasks = [
  {
    id: 1,
    title: "Task 1",
    description: "Description for Task 1",
    completed: false,
    createdAt: new Date().toISOString(),
    priority: "high",
  },
  {
    id: 2,
    title: "Task 2",
    description: "Description for Task 2",
    completed: true,
    createdAt: new Date().toISOString(),
    priority: "low",
  },
];

let nextId = 3;

router.get("/", (req, res) => {
  res.status(200).json(tasks);
});

router.post("/", (req, res) => {
  const { title, description, priority } = req.body;
  const error = validateTask({ title, description, priority });
  if (error) {
    return res.status(400).json({ error });
  }
  const newTask = {
    id: nextId++,
    title: title.trim(),
    description: description.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
    priority,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

router.put("/:id", (req, res) => {
  const taskId = Number(req.params.id);
  const { title, description, priority, completed } = req.body;

  const error = validateTask({ title, description, priority });
  if (error) {
    return res.status(400).json({ error });
  }

  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }
  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: title.trim(),
    description: description.trim(),
    priority,
    completed:
      typeof completed === "boolean" ? completed : tasks[taskIndex].completed,
  };
  res.status(200).json(tasks[taskIndex]);
});

router.delete("/:id", (req, res) => {
  const taskId = Number(req.params.id);

  const taskExists = tasks.some((task) => task.id === taskId);
  if (!taskExists) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks = tasks.filter((task) => task.id !== taskId);
  res.status(200).json({ message: "Task deleted successfully" });
});

router.patch("/:id/toggle", (req, res) => {
  const taskId = Number(req.params.id);

  const task = tasks.find((task) => task.id === taskId);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.completed = !task.completed;

  res.status(200).json(task);
});

module.exports = router;
