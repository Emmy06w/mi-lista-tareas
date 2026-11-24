
import test from "node:test";
import assert from "node:assert/strict";

import {
  createTask,
  editTask,
  deleteTask,
  toggleTask
} from "./taskLogic.js";

test("Crear una tarea correctamente", () => {
  const task = createTask("Estudiar", "1");

  assert.deepEqual(task, {
    id: "1",
    title: "Estudiar",
    completed: false
  });
});

test("No permitir tareas vacías", () => {
  assert.equal(createTask("   "), null);
});

test("Editar una tarea", () => {
  const tasks = [createTask("Estudiar", "1")];

  const result = editTask(tasks, "1", "Leer");

  assert.equal(result[0].title, "Leer");
});

test("Eliminar una tarea", () => {
  const tasks = [createTask("Estudiar", "1")];

  const result = deleteTask(tasks, "1");

  assert.equal(result.length, 0);
});

test("Marcar una tarea como completada", () => {
  const tasks = [createTask("Estudiar", "1")];

  const result = toggleTask(tasks, "1");

  assert.equal(result[0].completed, true);
});
