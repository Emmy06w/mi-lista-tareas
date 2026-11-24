
import {
  createTask,
  editTask,
  deleteTask,
  toggleTask
} from "./taskLogic.js";

const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");
const message = document.getElementById("message");
const emptyMessage = document.getElementById("emptyMessage");

const STORAGE_KEY = "mi_lista_tareas";

let tasks = [];

try {
  tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  if (!Array.isArray(tasks)) tasks = [];
} catch {
  tasks = [];
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function renderTasks() {
  list.innerHTML = "";

  emptyMessage.hidden = tasks.length > 0;

  tasks.forEach(task => {
    const item = document.createElement("li");
    if (task.completed) item.classList.add("completada");

    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = task.completed;
    check.setAttribute("aria-label", "Marcar como completada");

    check.addEventListener("change", () => {
      tasks = toggleTask(tasks, task.id);
      saveTasks();
      renderTasks();
    });

    const name = document.createElement("span");
    name.textContent = task.title;

    const editButton = document.createElement("button");
    editButton.textContent = "Editar";

    editButton.addEventListener("click", () => {
      const newTitle = prompt("Editar tarea:", task.title);

      if (newTitle === null) return;

      if (!newTitle.trim()) {
        message.textContent = "Escribe un nombre válido.";
        return;
      }

      tasks = editTask(tasks, task.id, newTitle);
      saveTasks();
      renderTasks();
      message.textContent = "Tarea editada correctamente.";
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";

    deleteButton.addEventListener("click", () => {
      tasks = deleteTask(tasks, task.id);
      saveTasks();
      renderTasks();
      message.textContent = "Tarea eliminada.";
    });

    item.append(check, name, editButton, deleteButton);
    list.appendChild(item);
  });
}

form.addEventListener("submit", event => {
  event.preventDefault();

  const task = createTask(input.value, crypto.randomUUID());

  if (!task) {
    message.textContent = "Escribe una tarea.";
    return;
  }

  tasks.push(task);
  saveTasks();
  renderTasks();

  input.value = "";
  message.textContent = "Tarea agregada correctamente.";
});

renderTasks();
