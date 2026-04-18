const express = require("express");
const router = express.Router();

const tasks = [
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

router.get("/", (req, res) => {
  res.status(200).json(tasks);
});

module.exports = router;
