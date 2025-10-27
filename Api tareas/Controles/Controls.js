import tareas from "../Modulos/moduls.js";

// 1. Obtener una lista de tareas
export const getTareas = (req, res) => {
  res.json(tareas);
};

// 2. Obtener una tarea por nombre
export const getTareaByNombre = (req, res) => {
  const nombre = req.params.nombre.toLowerCase();
  const tarea = tareas.find((t) => t.tarea.toLowerCase() === nombre);
  if (tarea) {
    res.json(tarea);
  } else {
    res.status(404).json({ error: "Tarea no encontrada" });
  }
};

// 3. Obtener listado tareas pendientes
export const getPendientes = (req, res) => {
  const pendientes = tareas.filter((t) => t.estado === "PENDIENTE");
  res.json(pendientes);
};

// 4. Obtener listado tareas completadas
export const getCompletadas = (req, res) => {
  const completadas = tareas.filter((t) => t.estado === "COMPLETADA");
  res.json(completadas);
};

// 5. Agregar una nueva tarea
export const addTarea = (req, res) => {
  const { tarea, estado } = req.body;
  if (!tarea || !estado) {
    return res.status(400).json({ error: "Faltan datos de tarea o estado" });
  }
  tareas.push({ tarea, estado });
  res.status(201).json({ message: "Tarea agregada", tarea: { tarea, estado } });
};

// 6. Actualizar una tarea existente
export const updateTarea = (req, res) => {
  const nombre = req.params.nombre.toLowerCase();
  const { tarea, estado } = req.body;
  const index = tareas.findIndex((t) => t.tarea.toLowerCase() === nombre);
  if (index === -1) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }
  if (!tarea || !estado) {
    return res.status(400).json({ error: "Faltan datos de tarea o estado" });
  }
  tareas[index] = { tarea, estado };
  res.json({ message: "Tarea actualizada", tarea: tareas[index] });
};

// 7. Actualizar el estado de una tarea
export const updateEstado = (req, res) => {
  const nombre = req.params.nombre.toLowerCase();
  const { estado } = req.body;
  const tarea = tareas.find((t) => t.tarea.toLowerCase() === nombre);
  if (!tarea) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }
  if (!estado) {
    return res.status(400).json({ error: "Falta el estado" });
  }
  tarea.estado = estado;
  res.json({ message: "Estado actualizado", tarea });
};

// 8. Eliminar una tarea específica
export const deleteTarea = (req, res) => {
  const nombre = req.params.nombre.toLowerCase();
  const index = tareas.findIndex((t) => t.tarea.toLowerCase() === nombre);
  if (index === -1) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }
  const tareaEliminada = tareas.splice(index, 1);
  res.json({ message: "Tarea eliminada", tarea: tareaEliminada[0] });
};
