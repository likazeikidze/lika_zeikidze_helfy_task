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

export async function createTask(taskData) {
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });
  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  return response.json();
}

export async function updateTask(taskId, updatedData) {
  const response = await fetch(`${URL}/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  return response.json();
}
