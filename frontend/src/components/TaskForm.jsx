import { useState } from "react";

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // basic validation before sending to backend
    if (!title.trim() || !description.trim() || !priority) {
      setError("Please fill in all fields");
      return;
    }
    setError("");

    onAddTask({
      title: title.trim(),
      description: description.trim(),
      priority,
    });

    setTitle("");
    setDescription("");
    setPriority("medium");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Add Task</h2>

      {error && <p className="form-error">{error}</p>}

      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
