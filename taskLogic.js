
export function createTask(title, id = String(Date.now())) {
  const name = title.trim();

  if (!name) return null;

  return {
    id,
    title: name,
    completed: false
  };
}

export function editTask(tasks, id, newTitle) {
  const name = newTitle.trim();

  if (!name) return tasks;

  return tasks.map(task =>
    task.id === id ? { ...task, title: name } : task
  );
}

export function deleteTask(tasks, id) {
  return tasks.filter(task => task.id !== id);
}

export function toggleTask(tasks, id) {
  return tasks.map(task =>
    task.id === id
      ? { ...task, completed: !task.completed }
      : task
  );
}
