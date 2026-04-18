const URL = "http://localhost:4000/api/tasks";

export async function getTasks() {
  const response = await fetch(URL);
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return response.json();
}

export async function toggleTaskCompletion(taskId) {
  const response = await fetch(`${URL}/${taskId}/toggle`, {
    method: "PATCH",
  });
  if (!response.ok) {
    throw new Error("Failed to toggle task completion");
  }

  return response.json();
}

export async function deleteTask(taskId) {
  const response = await fetch(`${URL}/${taskId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete task");
  }

  return response.json();
}
