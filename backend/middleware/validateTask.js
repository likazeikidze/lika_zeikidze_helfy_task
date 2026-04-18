const validateTask = (task) => {
  const { title, description, priority } = task;
  if (!title || !title.trim()) {
    return "Title is required";
  }
  if (!description || !description.trim()) {
    return "Description is required";
  }
  if (!priority || !["low", "medium", "high"].includes(priority)) {
    return "Priority must be low, medium, or high";
  }
  return null;
};

module.exports = validateTask;
