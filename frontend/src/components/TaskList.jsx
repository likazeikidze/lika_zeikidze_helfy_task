import { useMemo } from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onToggle, onDelete, onEdit }) => {
  if (tasks.length === 0) {
    return <p className="empty-state">No tasks available</p>;
  }

  // skip duplication for small lists to prevent visible repetition
  const carouselTasks = useMemo(
    () => (tasks.length > 3 ? [...tasks, ...tasks] : tasks),
    [tasks],
  );
  const duration = useMemo(() => Math.max(tasks.length * 2, 6), [tasks.length]);

  return (
    <div className="task-list">
      <h2>Tasks Carousel</h2>

      <div className="carousel-wrapper">
        <div
          className="carousel-track"
          style={{ animationDuration: `${duration}s` }}
        >
          {carouselTasks.map((task, index) => (
            <div key={`${task.id}-${index}`} className="carousel-slide">
              <TaskItem
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
