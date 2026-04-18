const express = require("express");
const cors = require("cors");
const tasksRouter = require("./routes/tasks");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;

app.get("/", (req, res) => {
  res.status(200).json({ message: "Task Manager API" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api/tasks", tasksRouter);
