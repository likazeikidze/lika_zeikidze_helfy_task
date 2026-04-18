import { useState, useEffect } from "react";
import {
  getTasks,
  toggleTaskCompletion,
  deleteTask,
  createTask,
  updateTask,
} from "./services/taskApi";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskFilter from "./components/TaskFilter";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError("");
        const tasksData = await getTasks();
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // filter tasks based on selected status
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const handleToggle = async (taskId) => {
    try {
      setError("");
      const updatedTask = await toggleTaskCompletion(taskId);

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task)),
      );
    } catch (error) {
      console.error("Error toggling task completion:", error);
      setError("Failed to toggle task completion");
    }
  };

  const handleDelete = async (taskId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!isConfirmed) return;

    try {
      setError("");
      await deleteTask(taskId);

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
      setError("Failed to delete task");
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      setError("");
      const newTask = await createTask(taskData);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error("Error adding task:", error);
      setError("Failed to add task");
    }
  };

  const handleUpdateTask = async (taskId, updatedData) => {
    try {
      setError("");
      const updatedTask = await updateTask(taskId, updatedData);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task)),
      );
    } catch (error) {
      console.error("Error updating task:", error);
      setError("Failed to update task");
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>Task Manager</h1>
        </header>

        <TaskForm onAddTask={handleAddTask} />
        <TaskFilter filter={filter} onFilterChange={setFilter} />

        {loading ? (
          <p className="status-message">Loading tasks...</p>
        ) : (
          <div>
            {error && <p className="status-message error-message">{error}</p>}

            <TaskList
              tasks={filteredTasks}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onEdit={handleUpdateTask}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
