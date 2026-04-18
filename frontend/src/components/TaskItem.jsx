import { memo } from "react";

const TaskItem = memo(({ task, onToggle, onDelete, onEdit }) => {
  const handleEdit = () => {
    const updatedTitle = prompt("Enter new task title:", task.title);
    if (updatedTitle === null) return;
    const updatedDescription = prompt(
      "Enter new task description:",
      task.description,
    );
    if (updatedDescription === null) return;

    const updatedPriority = prompt(
      "Enter priority: low, medium, or high",
      task.priority,
    );
    if (updatedPriority === null) return;

    if (
      !updatedTitle.trim() ||
      !updatedDescription.trim() ||
      !updatedPriority
    ) {
      alert("Please provide valid title, description, and priority.");
      return;
    }

    onEdit(task.id, {
      ...task,
      title: updatedTitle.trim(),
      description: updatedDescription.trim(),
      priority: updatedPriority,
    });
  };

  return (
    <li className="task-card">
      <div className="task-card-top">
        <span className={`priority-badge ${task.priority}`}>
          {task.priority}
        </span>
        <span className={`task-status ${task.completed ? "done" : "pending"}`}>
          {task.completed ? "Completed" : "Pending"}
        </span>
      </div>

      <h3>{task.title}</h3>
      <p>{task.description}</p>

      <p className="task-date">
        Created: {new Date(task.createdAt).toLocaleDateString()}
      </p>

      <div className="task-actions">
        <button className="delete-btn" onClick={() => onDelete(task.id)}>
          Delete
        </button>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={() => onToggle(task.id)}>
          {task.completed ? "Mark Pending" : "Mark Complete"}
        </button>
      </div>
    </li>
  );
});

export default TaskItem;
