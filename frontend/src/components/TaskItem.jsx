const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <li>
      <h3>
        {task.title} {task.completed ? "✅" : "❌"}
      </h3>
      <p>{task.description} </p>

      <button onClick={() => onDelete(task.id)}>Delete</button>
      <button>Edit</button>
      <button onClick={() => onToggle(task.id)}>Toggle</button>
    </li>
  );
};

export default TaskItem;
