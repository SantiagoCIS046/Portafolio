import {
  getTareas,
  getTareaByNombre,
  getPendientes,
  getCompletadas,
  addTarea,
  updateTarea,
  updateEstado,
  deleteTarea,
} from "../Controles/Controls.js";

export const setupRoutes = (app) => {
  // 1. Obtener una lista de tareas
  app.get("/tareas", getTareas);

  // 2. Obtener una tarea por nombre
  app.get("/tareas/:nombre", getTareaByNombre);

  // 3. Obtener listado tareas pendientes
  app.get("/tareas/pendientes", getPendientes);

  // 4. Obtener listado tareas completadas
  app.get("/tareas/completadas", getCompletadas);

  // 5. Agregar una nueva tarea
  app.post("/tareas", addTarea);

  // 6. Actualizar una tarea existente
  app.put("/tareas/:nombre", updateTarea);

  // 7. Actualizar el estado de una tarea
  app.patch("/tareas/:nombre/estado", updateEstado);

  // 8. Eliminar una tarea específica
  app.delete("/tareas/:nombre", deleteTarea);
};
