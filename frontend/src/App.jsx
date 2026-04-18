import { useState, useEffect } from "react";
import { getTasks, toggleTaskCompletion, deleteTask } from "./services/taskApi";
import TaskList from "./components/TaskList";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await getTasks();
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleToggle = async (taskId) => {
    try {
      const updatedTask = await toggleTaskCompletion(taskId);

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task)),
      );
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <>
      <h1>Task Manager</h1>
      <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
    </>
  );
};

export default App;
